import { Button } from "@/components/ui/button";
import { Home, LogOut } from "lucide-react";
import Link from "next/link";
import { TeacherInfo } from "./info";
import { CommonPagesWithDescription, PageInfo } from "@/lib/pages";

const items: PageInfo[] = [
  {
    title: "Página Inicial",
    icon: Home,
    href: "/dashboard",
  },
  ...CommonPagesWithDescription
] satisfies PageInfo[];

export function TeacherSidebar() {
  return (
    <nav className="flex flex-col w-full h-screen justify-between">
      <div className="border-b-[1.2px] border-accent">
        <TeacherInfo />
      </div>

      <div className="w-full my-6 px-2 flex-auto">
        {items.map((item) => (
          <Button
            asChild
            key={item.title}
            className="w-full justify-start"
            variant="ghost"
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </Button>
        ))}
      </div>

      <div className="border-t-[1.2px] border-accent p-4">
        <Button className="w-full justify-start cursor-pointer" variant="ghost">
          <LogOut />
          Sair
        </Button>
      </div>
    </nav>
  );
}
