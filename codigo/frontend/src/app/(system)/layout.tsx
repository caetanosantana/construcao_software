import { ReactNode } from "react";
import { TeacherSidebar } from "@/components/sidebar/user";
import { getUserType } from "@/lib/user";
import { QuestionsProvider } from "@/context/QuestionContext";

export default function SystemLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // FIXME: se não estiver logado tem que redirecionar para a página inicial de guest ou login
  const userType = getUserType();
  const sidebar = userType === "teacher" ? <TeacherSidebar /> : null;

  return (
    <QuestionsProvider>
      <div className="flex flex-row w-screen h-screen items-center justify-center">
        <section className="hidden lg:flex w-1/5 h-screen border-r-[1.2px] border-accent">
          {sidebar}
        </section>

        <main className="flex flex-col w-full lg:w-4/5 h-screen">
          {children}
        </main>
      </div>
    </QuestionsProvider>
  );
}
