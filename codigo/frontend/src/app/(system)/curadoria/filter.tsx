"use client";
import * as motion from "motion/react-client";

import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Funnel, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { useMediaQuery } from "usehooks-ts";
import { FilterState, useQuestions } from "./context";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function Filter() {
  const { search, setSearch, filter, setFilter, questions } = useQuestions();

  const isMobile = useMediaQuery("(max-width: 425px)");
  const [pressed, setPressed] = useState(false);

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
    <>
      <div className="flex w-full items-center space-x-2">
        <Input
          placeholder="Buscar Questões"
          type="text"
          name="search"
          className="w-full h-10"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
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
            initial={{ opacity: 0, scale: 0, height: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              height: "100%",
            }}
            exit={{ opacity: 0, scale: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "anticipate", type: "tween" }}
            dragElastic={0.1}
            className="max-h-32"
          >
            <Tabs
              value={filter}
              activationMode="manual"
              className="w-full px-8 py-1 bg-muted border border-zinc-200 rounded-sm h-full"
              orientation={isMobile ? "vertical" : "horizontal"}
              onValueChange={(value) => {
                setFilter(value as FilterState);
              }}
            >
              <TabsList className="w-full flex-col sm:flex-row h-full">
                <TabsTrigger
                  className="data-[state=active]:bg-background/75 rounded-xs"
                  value={FilterState.Pending}
                >
                  Pendentes ({questionsPending})
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-background/75 rounded-xs"
                  value={FilterState.Approved}
                >
                  Aprovadas ({questionsApproved})
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-background/75 rounded-xs"
                  value={FilterState.Reproved}
                >
                  {" "}
                  Reprovadas ({questionsReproved})
                </TabsTrigger>
                <Button
                  variant="ghost"
                  className="rounded-xs"
                  onClick={() => {
                    setFilter(FilterState.None);
                  }}
                >
                  <X />
                </Button>
              </TabsList>
            </Tabs>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
