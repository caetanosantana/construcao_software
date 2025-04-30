"use client";

import { type Alternative, Question, QuestionBadge } from "@/lib/question";
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
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  question: Question;
}

const getQuestionBadgeStyle = (badge: QuestionBadge) => {
  return {
    backgroundColor: badge.background,
    borderColor: badge.border,
    color: badge.color,
  };
};

// FIXME: mover para arquivo separado
// FIXME: adicionar tipos diferentes de alternativas, como imagem, etc...
const Alternative = ({
  answer,
  // type,
  id,
  selected,
  value,
}: Alternative & { selected: boolean; value: string }) => {
  return (
    <div className="flex items-center space-x-3 py-2">
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full select-none cursor-pointer border border-gray-300 text-black",

          { "bg-green-100 text-green-700 border-green-400": selected }
        )}
      >
        {value}
      </div>
      <Label
        htmlFor={id}
        className={cn(
          "text-base font-normal cursor-pointer",
          selected && "text-green-700"
        )}
      >
        {answer}
      </Label>
    </div>
  );
};

export const QuestionCard = ({ question }: Props) => {
  const [selectedValue, setSelectedValue] = useState<string>();

  return (
    <Card className="w-full border-t-blue-400 border-t-4">
      <CardHeader className={cn("gap-4 p-0 flex flex-col", !question.obr && "grid-rows-none ")}>
        <CardTitle className="flex justify-between items-center w-full px-2 md:px-3 lg:px-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full text-sm">
              <strong>#{question.number}</strong>
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full"
              style={getQuestionBadgeStyle(question.education)}
            >
              {question.education.label}
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full"
              style={getQuestionBadgeStyle(question.knowledge)}
            >
              {question.knowledge.label}
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full"
              style={getQuestionBadgeStyle(question.hability)}
            >
              {question.hability.label}
            </Badge>
          </div>

          <div className="flex gap-2">
            {question.can.add && (
              <Button variant="ghost" size="icon-lg">
                <Plus />
              </Button>
            )}
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
        <p>{question.asking}</p>

        <div className="flex flex-col gap-6">
          <span>
            <strong>Alternativas</strong>
          </span>

          <RadioGroup
            className="flex flex-col"
            value={selectedValue}
            onValueChange={setSelectedValue}
          >
            {question.alternatives.map((alternative, idx) => (
              <div className="flex items-center space-x-3" key={alternative.id}>
                <div onClick={() => setSelectedValue(alternative.id)}>
                  <Alternative
                    {...alternative}
                    selected={selectedValue === alternative.id}
                    // FIXME: Esse valor precisa pegar de uma maneira melhor ;(
                    value={String.fromCharCode("A".charCodeAt(0) + idx)}
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
