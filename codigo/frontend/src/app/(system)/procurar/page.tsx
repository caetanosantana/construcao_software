import { Page } from "@/components/page";
import { QuestionCard } from "@/components/question/card";

import { getQuestions } from "@/lib/question";
import { Filters } from "./filters";

export default function FindQuestionPage() {
  const questions = getQuestions();

  return (
    <Page items={[{ label: "Buscar Questões" }]} title="Buscar Questões">
      <div className="w-full container mx-auto px-4 sm:px-6 lg:px-32 gap-4 flex flex-col">
        <Filters />

        {questions.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </div>
    </Page>
  );
}
