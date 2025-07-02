"use client";

import { Page } from "@/components/page";
import { QuestionCard } from "@/components/question/card";
import { useQuestions } from "@/context/QuestionContext";

import { Filters } from "./filters";
import { Loader2 } from "lucide-react";

export default function FindQuestionPage() {
  const { questions, isLoading } = useQuestions();

  return (
    <Page items={[{ label: "Buscar Questões" }]} title="Buscar Questões">
      <div className="w-full container mx-auto px-4 sm:px-6 lg:px-32 gap-4 flex flex-col">
        <Filters />
        {isLoading && (
          <div className="flex items-center justify-center w-full h-96 animate-spin">
            <Loader2 className="w-8 h-8 text-gray-500" />
          </div>
        )}

        {!isLoading && questions.length === 0 && (
          <div className="flex items-center justify-center w-full h-96">
            <p className="text-gray-500">Nenhuma questão encontrada.</p>
          </div>
        )}
      
        {questions.map((q, number) => (
          <QuestionCard key={q.id} question={q} number={questions.length - number}/>
        ))}
      </div>
    </Page>
  );
}
