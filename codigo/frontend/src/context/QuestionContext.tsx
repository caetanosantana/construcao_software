"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Question, QuestionWithoutCorrect } from "@/lib/question";
import { getQuestionsAction } from "@/app/api/getQuestionsAction";

type QuestionsContextType = {
  questions: Question[];
  addQuestion: (q: Question) => void;
  setQuestionsFilter: (newFilter: Filter) => void;
  isLoading: boolean;
};

type Filter = {
  search?: string;
  education?: string;
  knowledge?: string;
  hability?: string;
  obr?: {
    years?: string;
    level?: string;
    stage?: string;
  };
};

const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined);

export const QuestionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<QuestionWithoutCorrect[]>([]);
  const [filter, setFilter] = useState<Filter>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await getQuestionsAction();
      if (res.success && res.questions) setQuestions(res.questions as unknown as QuestionWithoutCorrect[]);

      setIsLoading(false);
    })();
  }, []);

  function addQuestion(q: Question) {
    setQuestions((prev) => [...prev, q]);
  }

  function setQuestionsFilter(newFilter: Filter) {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  }

  function getFilteredQuestions() {
    return questions.filter((q) => {
      // Busca textual
      if (filter.search && !q.question.toLowerCase().includes(filter.search.toLowerCase())) return false;
      // Escolaridade
      if (filter.education && filter.education !== "all" && q.education !== (filter.education === "ef" ? "Ensino Fundamental" : "Ensino Médio")) return false;
      // Área de conhecimento
      if (filter.knowledge && filter.knowledge !== "all" && q.knowledge !== filter.knowledge) return false;
      // Habilidade
      if (filter.hability && filter.hability !== "all" && q.hability !== filter.hability) return false;
      // OBR ano
      if (filter.obr?.years && filter.obr.years !== "all" && (!q.obr || q.obr.year !== filter.obr.years)) return false;
      // OBR nível
      if (filter.obr?.level && filter.obr.level !== "all" && (!q.obr || q.obr.level !== filter.obr.level)) return false;
      // OBR etapa
      if (filter.obr?.stage && filter.obr.stage !== "all" && (!q.obr || q.obr.stage !== filter.obr.stage)) return false;
      return true;
    });
  }

  return (
    <QuestionsContext.Provider value={{ questions: getFilteredQuestions(), addQuestion, setQuestionsFilter, isLoading, }}>
      {children}
    </QuestionsContext.Provider>
  );
};

export function useQuestions() {
  const ctx = useContext(QuestionsContext);
  if (!ctx) throw new Error("useQuestions must be used within QuestionsProvider");
  return ctx;
}