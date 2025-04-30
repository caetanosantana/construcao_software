import { getUserType } from "@/lib/user";
import { redirect } from "next/navigation";

export default function Home() {
  const userType = getUserType();

  if (userType) {
    redirect(`/dashboard`);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      PÁGINA INICIAL DO OBRQUIZ
    </div>
  );
}
