"use server";
import { getQuestions } from "@/lib/question";

export async function getQuestionsAction() {
  try {
    const questions = await getQuestions();

    return { success: true, questions };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Erro ao buscar questões" };
  }
}
