"use server";

import { approveQuestion, rejectQuestion } from "@/lib/question";
import { revalidatePath } from "next/cache";

export const approve = async (id: string) => {
  const response = await approveQuestion(id);

  revalidatePath("/curadoria");

  if (response.success) {
    return { success: true, id };
  } else {
    return { success: false, error: response.error || "Erro ao aprovar a questão" };
  }
}

export const reject = async (id: string) => {
  const response = await rejectQuestion(id);

  revalidatePath("/curadoria");
  
  if (response.success) {
    return { success: true, id };
  } else {
    return { success: false, error: response.error || "Erro ao reprovar a questão" };
  }
}