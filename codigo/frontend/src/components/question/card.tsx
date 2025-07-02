"use client";

import { type Alternative, Question } from "@/lib/question";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { checkIfAlternativeCorrect } from "./check-question";
import { getQuestionBadgeStyle } from "@/lib/styles";

interface Props {
  question: Question;
  number: number;
}

// FIXME: mover para arquivo separado
// FIXME: adicionar tipos diferentes de alternativas, como imagem, etc...
const Alternative = ({
  answer,
  // type,
  id,
  selected,
  value,
  isCorrect,
  isLoading = false,
  disabled = false,
}: Alternative & {
  selected: boolean;
  value: string;
  isCorrect?: boolean;
  isLoading: boolean;
  disabled: boolean;
}) => {
  return (
    <div className="flex items-center space-x-3 py-2">
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full select-none cursor-pointer border border-gray-300 text-black",
          {
            "bg-gray-300 cursor-not-allowed": disabled,
            "bg-blue-200 text-blue-700 animate-spin cursor-not-allowed":
              selected && isLoading,
            "bg-red-100 text-red-700 border-red-400": selected && isCorrect,
            "bg-green-100 text-green-700 border-green-400": isCorrect,
          }
        )}
      >
        {isLoading ? <Loader2 /> : value}
      </div>
      <Label
        htmlFor={id}
        className={cn(
          "text-base font-normal cursor-pointer disabled:cursor-not-allowed disabled:text-gray-500",
          { "text-blue-700": selected && isLoading },
          { "text-red-700": selected && isCorrect },
          { "text-green-700": isCorrect }
        )}
        aria-disabled={disabled}
      >
        {answer}
      </Label>
    </div>
  );
};

export const QuestionCard = ({ question, number }: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>();
  const [status, setStatus] = useState<
    Record<
      string,
      {
        isCorrect: boolean;
        isLoading: boolean;
      }
    >
  >({});

  const handleCheckAlternative = async (value: string) => {
    const alternative = question.alternatives.find((alt) => alt.id === value);

    if (!alternative) {
      return;
    }
    setSelectedValue(alternative.id);
    setStatus((prev) => ({
      ...prev,
      [alternative.id]: { isLoading: true, isCorrect: false },
    }));

    const isCorrect = await checkIfAlternativeCorrect(
      question.id,
      alternative.id
    );

    setStatus((prev) => ({
      ...prev,
      [alternative.id]: { isLoading: false, isCorrect },
    }));

    if (isCorrect) {
      setIsChecked(true);
      toast.success("Alternativa correta!");
    } else {
      toast.error("Alternativa incorreta.");
    }
  };

  return (
    <Card className="w-full border-t-blue-400 border-t-4">
      <CardHeader
        className={cn(
          "gap-4 p-0 flex flex-col",
          !question.obr && "grid-rows-none "
        )}
      >
        <CardTitle className="flex justify-between items-center w-full px-2 md:px-3 lg:px-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full text-sm">
              <strong>#{number}</strong>
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
          </div>

          <div className="flex gap-2">
            {/* {question.can.add && (
              <Button variant="ghost" size="icon-lg">
                <Plus />
              </Button>
            )} */}
          </div>
        </CardTitle>

        {question.obr && (
          <CardDescription className="bg-orange-100 py-1 px-2 md:px-3 lg:px-6 gap-2 flex flex-wrap items-center w-full">
            <Badge
              variant="outline"
              className="rounded-full font-bold bg-orange-400 text-white border-orange-200"
            >
              <strong>OBR</strong>
            </Badge>

            <span className="text-orange-800 text-xs">
              Ano: {question.obr?.year} | Etapa: {question.obr?.stage} |
              Questão: {question.obr?.question_number}
            </span>
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="text-sm grid gap-2 px-2 md:px-3 lg:px-6 text-justify">
        <p className="tracking-tight">{question.question}</p>

        <div className="flex flex-col gap-6">
          <span>
            <strong>Alternativas</strong>
          </span>

          <RadioGroup
            className="flex flex-col"
            value={selectedValue}
            onValueChange={handleCheckAlternative}
            disabled={isChecked}
          >
            {question.alternatives.map((alternative, idx) => (
              <div className="flex items-center space-x-3" key={alternative.id}>
                <div onClick={() => handleCheckAlternative(alternative.id)}>
                  <Alternative
                    {...alternative}
                    selected={selectedValue === alternative.id}
                    // FIXME: Esse valor precisa pegar de uma maneira melhor ;(
                    value={String.fromCharCode("A".charCodeAt(0) + idx)}
                    isLoading={status[alternative.id]?.isLoading || false}
                    isCorrect={status[alternative.id]?.isCorrect}
                    disabled= {isChecked || status[alternative.id]?.isLoading}
                  />
                  <RadioGroupItem
                    value={alternative.id}
                    id={alternative.id}
                    className="sr-only"
                  />
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};
