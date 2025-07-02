import { auth } from "@/auth";
import { db } from "@/db";
import {
  questions as questionsTable,
  alternatives as alternativesTable,
  InsertQuestion,
  InsertAlternative,
  users,
} from "@/db/schema";
import { eq, getTableColumns } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export type QuestionBadge = {
  color: string;
  background: string;
  border: string;
  label: string;
};

export type Alternative = {
  id: string;
  answer: string;
  type: "image" | "string";
  image?: Buffer | string | null; // For images, can be null if not an image
  isCorrect: boolean;
};

export interface Question {
  id: string;
  number: number;
  question: string;
  education: string;
  knowledge: string;
  hability: string;
  obr?: {
    year?: string;
    level?: string;
    stage?: string;
    question_number?: string;
  };
  // this is inserted at fly when the user can do something with the question
  // e.g. can add alternatives, delete the question, etc.
  can?: {
    add?: boolean;
    delete?: boolean;
  };
  alternatives: Alternative[];
  userId: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export type QuestionWithoutCorrect = Omit<Question, "alternatives[].isCorrect">;

export type QuestionCurated = Question & {
  author: string; // Author's name
};

const DefaulKnowledgeAreaID = 1; // Default knowledge area ID, change as needed

export async function getQuestions() {
  const questions = await db.select().from(questionsTable).where(
    eq(questionsTable.status, "approved")
  );
  const alternatives = await db
    .select({
      id: alternativesTable.id,
      answer: alternativesTable.answer,
      type: alternativesTable.type,
      questionId: alternativesTable.questionId,
    })
    .from(alternativesTable);

  return questions.map((q) => ({
    ...q,
    alternatives: alternatives
      .filter((a) => a.questionId === q.id)
      .map(({ id, answer, type }) => ({ id, answer, type })),
  }));
}

// Buscar questões com informações de curadoria
export async function getQuestionsCurated() {
  const questions = await db.select({
    ...getTableColumns(questionsTable),
    author: users.name,
  }).from(questionsTable).leftJoin(
    users,
    eq(questionsTable.userId, users.id) 
  );
  const alternatives = await db
    .select()
    .from(alternativesTable);

  return questions.map((q) => ({
    ...q,
    alternatives: alternatives
      .filter((a) => a.questionId === q.id),
  })) as QuestionCurated[];
}

export async function addQuestion(
  question: Omit<Question, "id" | "created_at" | "updated_at">
) {
  const q = await db.transaction(async (tx) => {
    const mappedQuestion: InsertQuestion = {
      id: uuidv4(),
      number: question.number,
      question: question.question,
      education: question.education,
      knowledge: question.knowledge,
      hability: question.hability,
      obrYear: question.obr?.year || undefined,
      obrLevel: question.obr?.level || undefined,
      obrStage: question.obr?.stage || undefined,
      obrQuestionNumber: question.obr?.question_number || undefined,
      userId: question.userId,
      status: "pending_approval",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      keyword: undefined,
      difficulty: undefined,
      knowledgeAreaId: DefaulKnowledgeAreaID,
      editionId: undefined,
      deleted_at: undefined,
    };

    const result = await tx
      .insert(questionsTable)
      .values(mappedQuestion)
      .returning({ id: questionsTable.id });

    const q = result[0];

    for (const alt of question.alternatives) {
      await tx.insert(alternativesTable).values({
        id: uuidv4(),
        answer: alt.answer,
        type: alt.type,
        isCorrect: alt.isCorrect ?? false, // usa o valor da questão, ou false
        questionId: q.id,
        data: alt.image ?? null, // usa o campo correto do schema
      } as InsertAlternative);
    }

    return q;
  });

  return { success: true, id: q.id };
}

// Atualizar uma questão
export async function updateQuestion(id: string, data: Partial<Question>) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const user = session.user;

    const existingQuestion = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.id, id))
      .limit(1)
      .then((rows) => rows[0]);

    if (!existingQuestion) {
      return { success: false, error: "Question not found" };
    }

    // FIXME: adicionar edição como admin
    if (existingQuestion.userId !== user.id) {
      return { success: false, error: "Unauthorized to update this question" };
    }

    const mappedQuestion: Partial<InsertQuestion> = {
      // number: data.number || existingQuestion.number,
      question: data.question || existingQuestion.question,
      education: data.education || existingQuestion.education,
      knowledge: data.knowledge || existingQuestion.knowledge,
      hability: data.hability || existingQuestion.hability,
      obrYear: data.obr?.year || existingQuestion.obrYear,
      obrLevel: data.obr?.level || existingQuestion.obrLevel,
      obrStage: data.obr?.stage || existingQuestion.obrStage,
      obrQuestionNumber:
        data.obr?.question_number || existingQuestion.obrQuestionNumber,
      status: "pending_approval",
      userId: existingQuestion.userId,
      created_at: data.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await db
      .update(questionsTable)
      .set(mappedQuestion)
      .where(eq(questionsTable.id, id));

    return { success: true, id };
  } catch (error) {
    console.error("Error updating question:", error);
    return { success: false, error: "Failed to update question" };
  }
}

export async function getQuestionToCheck(id: string) {
  try {
    const questions = await db.select().from(questionsTable).where(eq(questionsTable.id, id));
    const alternatives = await db
      .select()
      .from(alternativesTable)
      .where(eq(alternativesTable.questionId, id));

    console.log("Checking question:", questions, alternatives);

    return {
      success: true,
      question: questions.map((q) => ({
        ...q,
        alternatives: alternatives.map(({ id, isCorrect }) => ({
          id,
          isCorrect,
        })),
      })).at(0),
    };
  } catch (error) {
    console.log("Error checking question:", error);
    return { success: false, error: "Failed to check question" };
  }
}

// Aprovar uma questão
export async function approveQuestion(id: string) {
  try {
    await db
      .update(questionsTable)
      .set({ status: "approved" })
      .where(eq(questionsTable.id, id));

    return { success: true };
  } catch (error) {
    console.error("Error approving question:", error);
    return { success: false, error: "Failed to approve question" };
  }
}

// Reprovar uma questão
export async function rejectQuestion(id: string) {
  try {
    await db
      .update(questionsTable)
      .set({ status: "rejected" })
      .where(eq(questionsTable.id, id));

    return { success: true };
  } catch (error) {
    console.error("Error rejecting question:", error);
    return { success: false, error: "Failed to reject question" };
  }
}
