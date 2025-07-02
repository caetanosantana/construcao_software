import { Page } from "@/components/page";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getQuestionsCurated } from "@/lib/question";
import { CircleCheckBig, CircleX, Clock } from "lucide-react";
import { List } from "./list";

export default async function CurationPage() {
  const questions = await getQuestionsCurated();

  if (!questions) {
    return (
      <Page items={[{ label: "Curadoria de Questões" }]} title="Curadoria de Questões">
        <div className="w-full container mx-auto px-4 sm:px-6 lg:px-16 gap-4 flex flex-col">
          <p className="text-gray-500">Nenhuma questão encontrada.</p>
        </div>
      </Page>
    );
  }

  const questionsApproved = questions.filter(
    (question) => question.status === "approved"
  ).length;
  const questionsReproved = questions.filter(
    (question) => question.status === "rejected"
  ).length;
  const questionsPending = questions.filter(
    (question) => question.status === "pending_approval"
  ).length;

  return (
    <Page
      items={[{ label: "Curadoria de Questões" }]}
      title="Curadoria de Questões"
    >
      <div className="w-full container mx-auto px-4 sm:px-6 lg:px-16 gap-4 flex flex-col">
        <div className="flex flex-col sm:flex-row gap-4">
          <Card className="w-full sm:w-1/3 bg-yellow-50 text-yellow-800 rounded-sm">
            <CardHeader>
              <CardTitle className="flex flex-col font-bold">
                <span className="text-xl flex gap-2 items-center">
                  <Clock /> Pendentes
                </span>
                <span className="text-3xl">{questionsPending}</span>
              </CardTitle>
              <CardDescription className="font-medium">
                Questões aguardando revisão
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-full sm:w-1/3 bg-emerald-50 text-emerald-800 rounded-sm">
            <CardHeader>
              <CardTitle className="flex flex-col font-bold">
                <span className="text-xl flex gap-2 items-center">
                  <CircleCheckBig /> Aprovadas
                </span>
                <span className="text-3xl">{questionsApproved}</span>
              </CardTitle>
              <CardDescription className="font-medium">
                Questões aprovadas recentemente
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="w-full sm:w-1/3 bg-red-50 text-red-800 rounded-sm">
            <CardHeader>
              <CardTitle className="flex flex-col font-bold">
                <span className="text-xl flex gap-2 items-center">
                  <CircleX /> Rejeitadas
                </span>
                <span className="text-3xl">{questionsReproved}</span>
              </CardTitle>
              <CardDescription className="font-medium">
                Questões rejeitadas recentemente
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <List questions={questions} />
        </div>
      </div>
    </Page>
  );
}
