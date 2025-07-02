"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useQuestions } from "./context";
import { BadgeStyles, getQuestionBadgeStyle } from "@/lib/styles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { QuestionCard } from "@/components/question/card";
import { Question, QuestionCurated } from "@/lib/question";
import { QUESTION_STATUS } from "@/lib/status";
import { approve, reject } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function QuestionList() {
  const router = useRouter();
  const { filteredQuestions } = useQuestions();
  const [viewQuestion, setViewQuestion] = useState<QuestionCurated>();
  const [questionIdx, setQuestionIndex] = useState<number>();

  const [questionStatus, setQuestionStatus] = useState<
    Record<
      string,
      {
        status: "pending_approval" | "approved" | "rejected";
        isLoading?: boolean;
      }
    >
  >({});

  const handleViewQuestion = (question: QuestionCurated, index: number) => {
    setViewQuestion(question);
    setQuestionIndex(filteredQuestions.length - index);
  };

  const handleRejectQuestion = async (id: string) => {
    setQuestionStatus((prev) => ({
      ...prev,
      [id]: { status: "rejected", isLoading: true },
    }));

    const response = await reject(id);

    if (response.success) {
      setQuestionStatus((prev) => ({
        ...prev,
        [id]: { status: "rejected", isLoading: false },
      }));

      toast.success("Questão rejeitada com sucesso.", {
        onDismiss: () => {
          router.refresh()
        }
      });
    } else {
      setQuestionStatus((prev) => ({
        ...prev,
        [id]: { status: "pending_approval", isLoading: false },
      }));

      toast.error(
        response.error || "Erro ao reprovar a questão. Tente novamente."
      );
    }
  };

  const handleApproveQuestion = async (id: string) => {
    setQuestionStatus((prev) => ({
      ...prev,
      [id]: { status: "pending_approval", isLoading: true },
    }));

    const response = await approve(id);

    if (response.success) {
      setQuestionStatus((prev) => ({
        ...prev,
        [id]: { status: "approved", isLoading: false },
      }));

      toast.success("Questão aprovada com sucesso.", {
        onDismiss: () => {
          router.refresh()
        }
      });
    } else {
      setQuestionStatus((prev) => ({
        ...prev,
        [id]: { status: "pending_approval", isLoading: false },
      }));

      toast.error(
        response.error || "Erro ao aprovar a questão. Tente novamente."
      );
    }
  };

  return (
    <>
      {filteredQuestions.map((question, idx) => (
        <Card
          key={question.id}
          className="w-full mb-4 gap-0"
          // onClick={() => question.onClick?.(question.id)}
        >
          <CardTitle className="flex justify-between items-center w-full px-2 md:px-3 lg:px-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="rounded-full text-sm">
                <strong>#{filteredQuestions.length - idx}</strong>
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full"
                style={getQuestionBadgeStyle("education")}
              >
                {question.education}
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full"
                style={getQuestionBadgeStyle("knowledge")}
              >
                {question.knowledge}
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full"
                style={getQuestionBadgeStyle("hability")}
              >
                {question.hability}
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full"
                style={getQuestionBadgeStyle(
                  questionStatus[question.id]?.status ??
                    (question.status as BadgeStyles)
                )}
              >
                {
                  QUESTION_STATUS[
                    questionStatus[question.id]?.status ??
                      (question.status as keyof typeof QUESTION_STATUS)
                  ]
                }
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="text-sm"
                onClick={() => handleViewQuestion(question, idx)}
              >
                Visualizar
              </Button>
              {!questionStatus[question.id]?.status &&
                question.status === "pending_approval" && (
                  <>
                    <Button
                      variant="outline"
                      className="text-sm text-destructive"
                      disabled={questionStatus[question.id]?.isLoading}
                      onClick={() => handleRejectQuestion(question.id)}
                    >
                      Rejeitar
                    </Button>

                    <Button
                      variant="success"
                      className="text-sm"
                      disabled={questionStatus[question.id]?.isLoading}
                      onClick={() => handleApproveQuestion(question.id)}
                    >
                      Aprovar
                    </Button>
                  </>
                )}
            </div>
          </CardTitle>
          <CardContent className="text-sm flex gap-2 px-2 md:px-3 lg:px-6 text-justify justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-gray-800 font-semibold">
                {question.question.length > 60
                  ? question.question.slice(0, 60) + "..."
                  : question.question}
              </p>
              <p className="text-gray-400 text-sm">
                Submetido por {question.author} em{" "}
                <time
                  dateTime={new Date(question.created_at).toLocaleString()}
                  suppressHydrationWarning
                >
                  {new Date(question.created_at).toLocaleString()}
                </time>
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      <Dialog
        open={!!viewQuestion}
        onOpenChange={() => {
          setViewQuestion(undefined);
          setQuestionIndex(undefined);
        }}
      >
        <DialogContent className="sm:max-w-md">
          {viewQuestion && (
            <div className="flex items-center justify-between mb-4 mt-4">
              <QuestionCard
                key={viewQuestion.id}
                question={viewQuestion as unknown as Question}
                number={filteredQuestions.length - questionIdx!}
              />
            </div>
          )}

          <DialogFooter className="sm:justify-end">
            <DialogClose asChild onClick={() => setViewQuestion(undefined)}>
              <Button type="button" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
