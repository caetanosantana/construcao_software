import { Page } from "@/components/page";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TeacherPagesWithDescription } from "@/lib/pages";
import Link from "next/link";

const cards = TeacherPagesWithDescription;

export function TeacherDashboard() {
  return (
    <Page
      items={[{ label: "Página Inicial" }]}
      title="Sistema de Cadastro de Questões"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link href={card.href} key={card.title}>
            <Card className="w-full h-full">
              <CardHeader className="w-full flex flex-col justify-center items-center text-center">
                <div className="size-14 rounded-full bg-gray-300 flex justify-center items-center">
                  <card.icon />
                </div>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </Page>
  );
}
