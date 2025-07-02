"use client";

import { motion, Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { AddSchema } from "./add.schema";
import { Step1 } from "./step1";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Step2 } from "./step2";
import { useRouter, useSearchParams } from "next/navigation";
import { addQuestionAction } from "./actions";
import { toast } from "sonner";
import { useTransition } from "react";

const ALL_STEPS = ["1", "2"];

const SEPARATOR_ANIMATIONS: Variants = {
  initial: {
    width: "0%",
  },
  stepped: {
    width: "100%",
  },
};

const CircleCheck = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    color="white"
    width={24}
    height={24}
  >
    <motion.path
      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" // Circle
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ rotate: -180, pathLength: 0 }}
      animate={{ rotate: 0, pathLength: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
    <motion.path
      d="M9 12l2 2 4-4" // Checkmark
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ rotate: -180, pathLength: 0 }}
      animate={{ rotate: 0, pathLength: 1 }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
    />
  </motion.svg>
);

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export function Steps() {
  const router = useRouter();
  const params = useSearchParams();
  const [lastStep, setLastStep] = useState(0);
  const canGoBack = lastStep > 0;
  const canGoForward = lastStep < ALL_STEPS.length - 1;


  const form = useForm<AddSchema>({
    resolver: zodResolver(AddSchema),
    defaultValues: {
      obr: null,
      type: "single",
      knowledge: "",
      question: {
        question: "",
        images: [],
      },
      answer: "",
    },
  });

  const formIsCompleted = form
    .watch(["question.question", "alternatives"])
    .every((value) => {
      if (Array.isArray(value)) {
        return value.every((item) => item.text || item.image);
      }
      return value !== "" && value !== undefined;
    });

  const [isPending, startTransition] = useTransition();

  const handleChangeStep = (step: number) => {
    // TODO: aqui vai ter que validar o estado do formulário para saber se pode ir para o próximo passo
    // tem que validar também se pode voltar para o passo anterior
    setLastStep(step);
  };

  async function handleSubmit(values: AddSchema) {
    startTransition(async () => {
      const result = await addQuestionAction(values);
      if (result.success) {
        toast.success("Questão cadastrada com sucesso!");
        router.push("/procurar");
      } else {
        toast.error(result.error || "Erro ao cadastrar questão");
      }
    });
  }

  return (
    <div className="flex items-center flex-col justify-center gap-4">
      <ol className="flex items-center w-sm justify-evenly">
        {ALL_STEPS.map((title, index) => (
          <Fragment key={`add-step-${title}`}>
            <li className="flex items-center select-none">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 bg-white border border-gray-200 dark:border-gray-950 text-black rounded-full lg:h-12 lg:w-12 shrink-0 cursor-pointer",
                  lastStep >= index && "bg-black text-white dark:border-white"
                )}
                onClick={() => {
                  handleChangeStep(index);
                }}
              >
                {lastStep > index && index < ALL_STEPS.length - 1 ? (
                  <CircleCheck />
                ) : (
                  title
                )}
              </div>
            </li>

            {index < ALL_STEPS.length - 1 && (
              <motion.li
                className={cn(
                  "inline-block w-[60%] sm:w-[70%] h-2 rounded-full bg-gray-400"
                )}
                transition={{ duration: 0.3 }}
                // animate={{
                //   backgroundColor:
                // }}
              >
                <motion.div
                  className="w-full h-full bg-gray-700 rounded-full"
                  initial="initial"
                  animate={lastStep - 1 >= index ? "stepped" : "initial"}
                  variants={SEPARATOR_ANIMATIONS}
                />
              </motion.li>
            )}
          </Fragment>
        ))}
      </ol>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full p-4"
          name="add-question-form"
        >
          {/* FIXME: implementar de uma forma melhor, criar um hook para gerenciar os estados e os passos */}
          {lastStep === 0 && <Step1 form={form} />}
          {lastStep === 1 && <Step2 form={form} />}
        </form>
      </Form>

      <div className="flex justify-between w-full p-4">
        <Button
          variant="outline"
          className={canGoBack ? "" : "invisible"}
          onClick={() => handleChangeStep(lastStep - 1)}
        >
          <ChevronLeft />
          Voltar
        </Button>

        {canGoForward && (
          <Button onClick={() => handleChangeStep(lastStep + 1)}>
            Próximo
            <ChevronRight />
          </Button>
        )}

        {lastStep === ALL_STEPS.length - 1 && (
          <Button
            type="submit"
            form="add-question-form"
            variant="success"
            disabled={!formIsCompleted || isPending}
            onClick={(ev) => {
              ev.preventDefault();
              if (formIsCompleted && !isPending) {
                handleSubmit(form.getValues());
              }
            }}
          >
            Cadastrar
          </Button>
        )}
      </div>
    </div>
  );
}
