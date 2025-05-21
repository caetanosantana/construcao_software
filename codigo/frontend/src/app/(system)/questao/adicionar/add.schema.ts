import { z } from "zod";

export type AddSchema = z.infer<typeof AddSchema>;

// FIXME: os campos education, knowledge, hability e competence devem ser arrays
// para permitir múltiplas seleções
export const AddSchema = z.object({
  education: z.enum(["ef", "em"]),
  knowledge: z.string(),
  hability: z.enum(["reading", "writing", "listening"]),
  competence: z.string(),
  isOBR: z.boolean(),
  obr: z.object({
    years: z.string(),
    level: z.enum(["0", "1", "2", "3", "4", "5"]),
    stage: z.enum(["1", "2"]),
    number: z.union([z.literal(""), z.number()]),
  }),

  question: z.object({
    question: z.string().min(10, "Campo obrigatório"),
    images: z.file().array(),
  }),
  type: z.enum(["multiple", "true-false", "single"]),
  alternatives: z.object({
    text: z.string().optional(),
    image: z.file().optional(),
    // FIXME: adicionar validação para o campo se nenhum dos dois campos estiver preenchido
  }).array(),

  //FIXME: isso pode ser um array também, mas daí estoura um monte de erros que é melhor resolver depois quando 
  //       tiver esse tipo de questão de multipla escolha ;(
  answer: z.string(), 
});