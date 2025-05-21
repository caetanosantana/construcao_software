import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UseFormReturn, useWatch } from "react-hook-form";
import { AddSchema } from "./add.schema";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function Step1({ form }: { form: UseFormReturn<AddSchema> }) {
  const isOBR = useWatch({ name: "isOBR", control: form.control });

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-semibold w-full text-center">
        1. Informações Básicas
      </h2>

      <div className="grid  md:grid-cols-2 gap-6 w-full">
        <FormField
          name="education"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-bold">Nível de Escolaridade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a escolaridade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
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
              <FormLabel className="text-bold">Área de Conhecimento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a área" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ef">Computação</SelectItem>
                  <SelectItem value="em">Portugues</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="competence"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-bold">Competência da Área</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a competência" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="tc1">Teste de Competência 1</SelectItem>
                  <SelectItem value="tc2">Teste de Competência 2</SelectItem>
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
              <FormLabel className="text-bold">Habilidade da BNCC</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Selecione a habilidade"
                      className="text-black w-full"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ef">Educação Física</SelectItem>
                  <SelectItem value="art">Arte</SelectItem>
                  <SelectItem value="math">Matematica</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex flex-col p-4 text-orange-800 bg-orange-100 dark:bg-orange-900 dark:text-orange-300 md:col-span-2 gap-6 rounded">
          <FormField
            control={form.control}
            name="isOBR"
            render={({ field }) => (
              <FormItem className="w-full flex flex-row items-center justify-between">
                <FormLabel>Questão da OBR</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-orange-800 dark:data-[state=checked]:bg-orange-300"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div
            className={cn(
              "grid md:grid-cols-2 xl:grid-cols-4 gap-4 text-primary",
              !isOBR && "hidden"
            )}
          >
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
                      <SelectTrigger className="w-full bg-gray-50 dark:bg-card dark:hover:bg-accent">
                        <SelectValue placeholder="Selecione um ano" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
                      <SelectTrigger className="w-full bg-gray-50 dark:bg-card dark:hover:bg-accent">
                        <SelectValue placeholder="Selecione um nível" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
                      <SelectItem value="5">Ensino Médio e Técnico</SelectItem>
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
                      <SelectTrigger className="w-full bg-gray-50 dark:bg-card dark:hover:bg-accent">
                        <SelectValue placeholder="Selecione a etapa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Fase 1</SelectItem>
                      <SelectItem value="2">Fase 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="obr.number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número da Questão</FormLabel>
                  <FormControl>
                    <Input type="number" className="bg-gray-50 dark:bg-card dark:hover:bg-accent" min={0} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
