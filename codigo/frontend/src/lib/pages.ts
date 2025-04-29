import { BookText, CircleCheckBig, CirclePlus, Search } from "lucide-react";

export interface PageInfo {
  title: string;
  icon: React.ComponentType;
  href: string;
}

export interface PageInfoWithDescription extends PageInfo {
  description: string;
}

export const TeacherPagesWithDescription: PageInfoWithDescription[] = [
  {
    title: "Buscar Questões",
    icon: Search,
    description: 'Pesquise e encontre questoes cadastradas no sistema.',
    href: "/procurar",
  },
  {
    title: "Adicionar Questões",
    icon: CirclePlus,
    description: 'Cadastre uma nova questão no sistema.',
    href: "/questao/adicionar",
  },
  {
    title: "Minhas Listas",
    icon: BookText,
    description: 'Visualize e gerencie suas listas de questões.',
    href: "/listas",
  },
  {
    title: "Curadoria",
    icon: CircleCheckBig,
    description: 'Revise, aprove ou rejeite questões submetidas por professores antes de serem adicionadas ao sistema.',
    href: "/curadoria",
  }
]