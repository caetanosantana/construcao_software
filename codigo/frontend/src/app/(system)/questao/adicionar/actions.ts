"use server";

import { addQuestion } from "@/lib/question";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { AddSchema } from "./add.schema";
import type { Alternative, Question } from "@/lib/question";

const adminID = "a44cd08a-b7d0-4337-94ff-5e822bce580e"; // Fixed ID for testing

export async function addQuestionAction(formData: z.infer<typeof AddSchema>) {
  try {
    // const session = await auth();
    // if (!session?.user?.id) {
    //   return { success: false, error: "Usuário não autenticado" };
    // }

    const alternatives: Alternative[] = [];
    const answer = Number(formData.answer?.trim()) || 0;

    for (const alt of formData.alternatives) {
      if (!alt.text && !alt.image) {
        return {
          success: false,
          error: "Alternativa inválida. Deve conter texto ou imagem.",
        };
      }

      
      const alternative: Alternative  = {
        id: "",
        answer: alt.text || "",
        type: "string",
        isCorrect: formData.alternatives.length >= answer && alt === formData.alternatives[answer], // usa o valor da questão, ou false
      };

      if (alt.image) {
        alternative.type = "image";
        
        alternative.image = Buffer.from(await alt.image.arrayBuffer()).toString("base64");
      }

      alternatives.push(alternative);
    }

    const question: Omit<Question, "id" | "created_at" | "updated_at">= {
      number: Number(formData.obr?.number) || 0,
      question: formData.question.question,
      education:
        formData.education === "ef" ? "Ensino Fundamental" : "Ensino Médio",
      knowledge: formData.knowledge,
      hability: formData.hability,
      obr: formData.isOBR
        ? {
            year: formData.obr?.years,
            level: formData.obr?.level,
            stage: formData.obr?.stage,
            question_number: formData.obr?.number,
          }
        : undefined,
      alternatives,
      userId: adminID, //session.user.id,
      status: "pending_approval",
    };
    const result = await addQuestion(question);
    revalidatePath("/procurar");

    return { success: true, id: result.id };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Erro ao adicionar questão",
    };
  }
}
