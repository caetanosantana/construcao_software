"use client";
import { QuestionCurated } from "@/lib/question";
import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react";


export const FilterState = {
  Approved: "approved",
  Reproved: "reproved",
  Pending: "pending",
  None: "",
} as const;
export type FilterState = typeof FilterState[keyof typeof FilterState];

const QuestionsContext = createContext<{
  questions: QuestionCurated[];
  filteredQuestions: QuestionCurated[];
  filter: FilterState;
  setFilter: Dispatch<SetStateAction<FilterState>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
} | null>(null);
QuestionsContext.displayName = "QuestionsContext";

export function QuestionsProvider({
  children,
  questions,
}: {
  children: React.ReactNode;
  questions: QuestionCurated[];
}) {
  const [filter, setFilter] = useState<FilterState>("");
  const [questionsState, setQuestionsState] = useState(questions);
  const [search, setSearch] = useState("");

  const filteredQuestions = questionsState
    .filter((question) =>
      question.status.toLowerCase().includes(filter.toLowerCase())
    )
    .filter((question) =>
      question.question.toLowerCase().includes(search.toLowerCase())
    );

  const contextValue = useMemo(
    () => ({
      questions,
      filteredQuestions,
      filter,
      setFilter,
      search,
      setSearch,
    }),
    [questions, filteredQuestions, filter, search]
  );

  return (
    <QuestionsContext.Provider value={contextValue}>
      {children}
    </QuestionsContext.Provider>
  );
}

export const useQuestions = () => {
  const questions = useContext(QuestionsContext);
  if (!questions) {
    throw new Error("useQuestions must be used within a QuestionsContext");
  }

  return questions;
};

export const useFilter = () => {
  const { filter, setFilter } = useQuestions();

  return [filter, setFilter] as const;
};

export const useSearch = () => {
  const { search, setSearch } = useQuestions();

  return [search, setSearch] as const;
};
