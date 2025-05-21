"use client";
import * as motion from "motion/react-client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { zodResolver } from "@hookform/resolvers/zod";
import { Funnel } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AnimatePresence } from "motion/react";
import { useMediaQuery } from "usehooks-ts";

const formSchema = z.object({
  education: z.enum(["all", "ef", "em"]),
  knowledge: z.string(),
  hability: z.enum(["all", "reading", "writing", "listening"]),
  obr: z.object({
    years: z.string(),
    level: z.enum(["all", "0", "1", "2", "3", "4", "5"]),
    stage: z.enum(["all", "1", "2"]),
  }),
});

// TODO: criar lista de anos, níveis, etapas da OBR com base no banco de dados
// TODO: criar lista de habilidades da BNCC, provavelmente melhor usar o DB?
export const Filters = () => {
  const isMobile = useMediaQuery("(max-width: 425px)");
  const [pressed, setPressed] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      education: "all",
      knowledge: "all",
      hability: "all",
      obr: {
        years: "all",
        level: "all",
        stage: "all",
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <div className="flex w-full items-center space-x-2">
        <Input
          placeholder="Buscar Questões"
          type="text"
          name="search"
          className="w-full h-10"
        />
        <Toggle
          variant="outline"
          type="submit"
          className="size-10"
          pressed={pressed}
          onPressedChange={setPressed}
        >
          <Funnel />
        </Toggle>
      </div>

      <AnimatePresence initial={false}>
        {pressed ? (
          <motion.div
            // layout
            initial={{ opacity: 0, scale: 0, height: 0, padding: 0 }}
            animate={{ opacity: 1, scale: 1, height: "100%", padding: isMobile ? 20 : 40 }}
            exit={{ opacity: 0, scale: 0, height: 0, padding: 0, }}
            transition={{ duration: 0.4, ease: "anticipate", type: "tween" }}
            dragElastic={0.1}
            className="flex w-full items-center space-x-2 p-10 bg-zinc-50 border border-zinc-200 rounded-sm"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 w-full"
              >
                <FormField
                  name="education"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-bold">
                        Nível de Escolaridade
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a escolaridade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">Todos os níveis</SelectItem>
                          <SelectItem value="ef">Ensino Fundamental</SelectItem>
                          <SelectItem value="em">Ensino Médio</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="knowledge"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-bold">
                        Área de Conhecimento
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a área" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">Todas as áres</SelectItem>
                          <SelectItem value="ef">Computação</SelectItem>
                          <SelectItem value="em">Portugues</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="hability"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-bold">
                        Habilidade da BNCC
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a habilidade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">
                            Todas as habilidades
                          </SelectItem>
                          <SelectItem value="ef">Educação Física</SelectItem>
                          <SelectItem value="art">Arte</SelectItem>
                          <SelectItem value="math">Matematica</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="obr.years"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-bold">Ano da OBR</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a habilidade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">Todos os anos</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                          <SelectItem value="2021">2021</SelectItem>
                          <SelectItem value="2020">2020</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="obr.stage"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-bold">Nível da OBR</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o nível" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">Todos os níveis</SelectItem>
                          <SelectItem value="0">
                            1º ano do Ensino Fundamental
                          </SelectItem>
                          <SelectItem value="1">
                            2º ou 3º ano do Ensino Fundamental
                          </SelectItem>
                          <SelectItem value="2">
                            4º ou 5º ano do Ensino Fundamental
                          </SelectItem>
                          <SelectItem value="3">
                            6º ou 7º ano do Ensino Fundamental
                          </SelectItem>
                          <SelectItem value="4">
                            8º ou 9º ano do Ensino Fundamental
                          </SelectItem>
                          <SelectItem value="5">
                            Ensino Médio e Técnico
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="obr.stage"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-bold">Etapa da OBR</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a etapa" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">Todas as etapas</SelectItem>
                          <SelectItem value="1">Fase 1</SelectItem>
                          <SelectItem value="2">Fase 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};
