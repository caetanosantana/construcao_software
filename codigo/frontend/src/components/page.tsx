import { cn } from "@/lib/utils";
import { PageBreadcrumb, PageBreadcrumbNode } from "./page-breadcrumb";

interface Props {
  children: React.ReactNode;
  items: PageBreadcrumbNode[];
  title: string | React.ReactNode;
  className?: string;
}

export const Page = ({ children, items, title, className }: Props) => {
  const isTitleString = typeof title === "string";
  const titleContent = isTitleString ? (
    <div className="w-full text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
  ) : (
    title
  );

  return (
    <div className={cn("flex min-h-screen flex-col space-y-8 p-8 overflow-y-auto", className)}>
      <PageBreadcrumb items={items} />

      {titleContent}

      {children}
    </div>
  );
};
