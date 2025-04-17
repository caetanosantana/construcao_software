import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./form";
import Link from "next/link";
import { BackgroundBoxes } from "@/components/ui/background-boxes";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center relative flex-col overflow-hidden rounded-lg border bg-background">
      <BackgroundBoxes />

      <Card className="w-[400px] bg-background z-1">
        <CardHeader>
          <CardTitle className="font-bold text-3xl text-center">
            OBRQUIZ
          </CardTitle>
          <CardDescription className="text-center">
            Bem-vindo(a)! Faça login para acessar o sistema de questões.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>

        <CardDescription className="text-muted-foreground text-sm text-center">
            Esqueceu a senha?{" "}
            <Link href="/esqueci-minha-senha" className="transition-all duration-300 underline decoration-transparent hover:decoration-inherit">
              Recuperar acesso
            </Link>
        </CardDescription>
      </Card>
    </div>
  );
}
