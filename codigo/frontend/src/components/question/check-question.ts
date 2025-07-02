"use server";

import { getQuestionToCheck } from "@/lib/question";

export async function checkIfAlternativeCorrect(questionId: string, alternativeId: string) {
  try {
    const response = await getQuestionToCheck(questionId);

    if (!response.success) {
      return false;
    }

    // check alternatives
    const { question } = response;

    const isCorrect = question!.alternatives.find(alt => alt.id === alternativeId)?.isCorrect;

    return isCorrect ?? false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return false;
  }
}