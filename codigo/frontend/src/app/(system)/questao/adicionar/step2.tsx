"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useFieldArray, UseFormReturn } from "react-hook-form";
import { AddSchema } from "./add.schema";
import { Card } from "@/components/ui/card";
import { lorem } from "@/lib/lorem";
import { Textarea } from "@/components/ui/textarea";
import { CirclePlus, ImageIcon, Trash2 } from "lucide-react";
import { ButtonFile } from "@/components/ui/button-file";
import { ImagePreview } from "@/components/ui/image-preview";
import { PromiseContainer } from "@/components/promise-container";
import { cn, fileReadAsync } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlternativeImage } from "./alternative";

export function Step2({ form }: { form: UseFormReturn<AddSchema> }) {
  const { watch } = form;
  const images = watch("question.images");

  const { fields, append, remove, update } = useFieldArray({
    name: "alternatives",
    control: form.control,
  });
  const alternatives = fields || [];

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-semibold w-full text-center">
        2. Conteúdo da Questão
      </h2>

      <div className="w-full flex flex-col gap-8">
        <Card className="p-4 bg-secondary">
          <FormField
            control={form.control}
            name="question.question"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-bold text-md">
                  Enunciado da Questão
                </FormLabel>
                <FormControl>
                  {/* FIXME: usar a WYSIWYG (basicamente um editor de texto), usar tiptap */}
                  <Textarea
                    placeholder={lorem.placeholder}
                    className="w-full h-64 min-h-32 bg-white dark:bg-secondary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex justify-end items-center gap-2">
            <PromiseContainer
              errorFallback={
                <div className="flex w-4/5 h-full justify-center text-sm text-muted-foreground">
                  Erro ao carregar imagem
                </div>
              }
            >
              {images.map((image, index) => (
                <div
                  key={`image-${index}`}
                  className="w-full relative h-auto bg-secondary p-4 rounded-md"
                >
                  <ImagePreview imageReader={fileReadAsync(image)} />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-4 right-4"
                    onClick={() => {
                      // FIXME: adicionar confirmação
                      const newImages = [...images];
                      newImages.splice(index, 1);
                      form.setValue("question.images", newImages);
                    }}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </PromiseContainer>

            <FormField
              control={form.control}
              name="question.images"
              render={({ field }) => (
                <ButtonFile
                  onChange={(files) => {
                    field.onChange(files);
                  }}
                  className={cn("w-fit", images.length > 0 && "hidden")}
                  accept="image/*"
                >
                  <ImageIcon />
                  Adicionar Imagem
                </ButtonFile>
              )}
            />
          </div>
        </Card>

        <h2 className="text-md font-semibold w-full">Alternativas</h2>

        <Card className="p-2 bg-secondary">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className={cn(
                        "flex flex-col gap-2",
                        alternatives.length <= 0 && "hidden"
                      )}
                      {...field}
                    >
                      {alternatives?.map((alternative, index) => {
                        // TODO: criar um componente para cadastro de alternativas
                        const alternativeLetter = String.fromCharCode(
                          65 + index
                        );

                        return (
                          <Card
                            key={`alternative-${alternative.id}`}
                            className="p-2 py-4 bg-white dark:bg-secondary gap-2"
                          >
                            <FormItem className="flex items-center gap-2">
                              <FormControl>
                                <RadioGroupItem
                                  value={index.toString()}
                                  classNameIndicator="fill-green-800 size-3.5"
                                  className={cn(
                                    "size-5",
                                    form.getValues("answer") ===
                                      index.toString() && "border-green-800"
                                  )}
                                />
                              </FormControl>

                              <FormLabel className="text-bold text-sm">
                                Alternativa {alternativeLetter}
                              </FormLabel>
                            </FormItem>

                            <div className="w-full px-8 flex flex-col gap-4">
                              <FormField
                                control={form.control}
                                name={`alternatives.${index}.text`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-bold text-sm">
                                      Texto
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Digite o texto aqui..."
                                        className="w-full bg-white dark:bg-secondary"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <AlternativeImage
                                image={form.getValues(
                                  `alternatives.${index}.image`
                                )}
                                onAdd={(files) => {
                                  update(index, {
                                    ...alternative,
                                    image: files[0],
                                  });
                                }}
                                onRemove={() => {
                                  // FIXME: adicionar confirmação
                                  update(index, {
                                    ...alternative,
                                    image: undefined,
                                  });
                                }}
                              />
                            </div>
                          </Card>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  append({
                    text: "",
                    image: undefined,
                  });
                }}
                type="button"
              >
                <CirclePlus />
                Adicionar Alternativa
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
