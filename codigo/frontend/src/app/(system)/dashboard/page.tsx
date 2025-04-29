import { TeacherSidebar } from "@/components/sidebar/user";
import { redirect } from "next/navigation";
import { TeacherDashboard } from "./_user/teacher";

export default function UserPage() {
  const userType = "teacher"; // FIXME: Após implementar o Auth, verificar o tipo do usuário
  const dashboard = userType === "teacher" ? <TeacherDashboard /> : null;

  if (!dashboard) {
    redirect("/");
  }

  return dashboard;
}