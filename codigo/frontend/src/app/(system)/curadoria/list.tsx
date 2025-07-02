"use client";

import { QuestionCurated } from "@/lib/question";
import { Filter } from "./filter";
import { QuestionList } from "./question-list";
import { QuestionsProvider } from "./context";

interface Props {
  questions: QuestionCurated[];
}

export function List({ questions }: Props) {
  return (
    <QuestionsProvider questions={questions}>
      <Filter />
      <QuestionList />
    </QuestionsProvider>
  );
}
