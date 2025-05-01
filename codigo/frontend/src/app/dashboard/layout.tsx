import { TeacherSidebar } from "@/components/sidebar/user";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
  teacher,
}: {
  children: React.ReactNode;
  teacher: React.ReactNode;
}) {
  const userType = "teacher"; // FIXME: Após implementar o Auth, verificar o tipo do usuário
  const dashboard = userType === "teacher" ? teacher : null;
  const sidebar = userType === "teacher" ? <TeacherSidebar /> : null;
  // TODO: Adicionar breadcrumbs com link das páginas

  if (!dashboard) {
    redirect("/");
  }

  return (
    <div className="flex flex-row w-screen min-h-screen items-center justify-center">
      <section className="hidden lg:flex w-1/5 h-screen border-r-[1.2px] border-accent">
        {sidebar}
      </section>

      <main className="flex flex-col w-full lg:w-4/5 h-screen">
        {dashboard}
        {children}
      </main>


    </div>
    
  );
}
