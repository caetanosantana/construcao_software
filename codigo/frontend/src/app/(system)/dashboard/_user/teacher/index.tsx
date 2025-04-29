import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TeacherPagesWithDescription } from "@/lib/pages";
import { House } from "lucide-react";

const cards = TeacherPagesWithDescription;

export function TeacherDashboard() {
  return (
    <div className="flex min-h-screen flex-col space-y-8 p-8">
      <Breadcrumb className="flex items-center space-x-1 text-sm leading-none text-muted-foreground">
        <BreadcrumbList>
          <BreadcrumbItem className="size-3.5">
            <House />
          </BreadcrumbItem>
        </BreadcrumbList>
        <BreadcrumbSeparator className="block" />
        <BreadcrumbItem className="text-foreground">Página Inicial</BreadcrumbItem>
      </Breadcrumb>

      <div className="w-full text-center">
        <h1 className="text-2xl font-bold">Sistema de Cadastro de Questões</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="w-full flex flex-col justify-center items-center text-center">
              <div className="size-14 rounded-full bg-gray-300 flex justify-center items-center">
                <card.icon />
              </div>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
