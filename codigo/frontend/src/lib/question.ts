import { lorem } from "./lorem";
import { copyWith } from "./utils";

export type QuestionBadge = {
  color: string;
  background: string;
  border: string;
  label: string;
}

export type Alternative = {
  id: string;
  answer: string;
  type: "image" | "string"; // FIXME: adicionar outras tipagens
}

export interface Question {
  id: string;

  number: number;
  question: string;

  education: QuestionBadge;
  knowledge: QuestionBadge;
  hability: QuestionBadge;

  obr?: {
    year: string;
    level: string;
    stage: string;
    question_number: number;
  }

  can: {
    add?: boolean;
    delete?: boolean;
  }

  alternatives: Alternative[]
}

const questions: Question[] = [
  {
    id: 'f8bab5ea-83a8-4e9b-ad56-df23843b9029',
    number: 3,
    question: lorem.question,
    education: {
      color: "#9A3412", // orange-800
      background: "#FFF0DF",
      border: "#FED7AA", // orange-200
      label: "Escolaridade da Questão"
    },
    knowledge: {
      color: "#155E9D",
      background: "#CFFAFE",
      border: "#A5F3FC",
      label: "Área do Conhecimento"
    },
    hability: {
      color: "#6C27AB",
      background: "#F3E8FF",
      border: "#E9D5FF",
      label: "Habilidade: N habilidade"
    },
    obr: {
      year: "ano da questão",
      level: "nível da questão",
      stage: "etapa da questão",
      question_number: 1,
    },
    can: {
      add: true,
    },

    alternatives: [
      { id: "5b02bf34-15d3-4d16-8dfb-0e10b15a2985", answer: "Alternativa A", type: "string" },
      { id: "6173d827-46cd-47cd-ade5-3dbf21ab35ea", answer: "Alternativa B", type: "string" },
      { id: "0dca1e46-1e2a-4514-a1f2-b886d9ba4789", answer: "Alternativa C", type: "string" },
      { id: "3eeef192-dce8-41ce-a9ad-42ad696038d6", answer: "Alternativa D", type: "string" },
    ]
  }
]

questions.push(copyWith(questions[0], {
  id: '955ae2b9-026b-41be-b25a-1f4112ac576c',
  number: 1,
  education: copyWith(questions[0].education, { color: "#155E9D", background: "#CFFAFE", border: "#A5F3FC", }),
  knowledge: copyWith(questions[0].knowledge, { color: "#b91c1c", background: "#fecaca", border: "#f87171", }),
  hability: copyWith(questions[0].hability, { color: "#166534", background: "#bbf7d0", border: "#22c55e", }),
  can: {
    add: true,
    delete: true
  },
  obr: undefined,
}))

export const getQuestions = () => {
  return questions;
}