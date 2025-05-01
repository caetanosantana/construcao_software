import { Select, 
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import Image from "next/image";
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input" ;
import Caixa from "@/app/dashboard/listas/caixa"

const questoes = [
    {
        materia:"Matematica",
        topico:"inequacoes",
        descricao:"10 questões | criada em  31/03/2024",
        hifen:'-',
        corTitulo:"#2e4eb5",
        id:0

    },

    {
        materia:"Historia",
        topico:"inequacoes",
        descricao:"10 questões | criada em  31/03/2024",
        hifen:'-',
        corTitulo:"#9f3e1e",
        id:1

    },

    {
        materia:"OBR etapa regional 2023",
        topico:"",
        descricao:"10 questões | criada em  31/03/2024",
        corTitulo:"#236f40",
        id:2

    }
]
export default function listas(){
return (
    <div className="flex flex-col w-11/12  mx-auto mt-8">
        <h1 className="text-center">Minhas listas</h1>
            <div className="flex flex-row justify-between mt-5 w-ful">
                <Input className="w-1/3" placeholder='Buscar listas pelo nome'/>

                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Mais recentes primeiros"/>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="item 1">item 1</SelectItem>
                        <SelectItem value="item 2">item 2</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-3 gap-x-3">
                    {questoes.map((questoes) =>
                        <Caixa
                        key={questoes.id}
                        hifen={questoes.hifen}
                        corTitulo={questoes.corTitulo}
                        descricao={questoes.descricao}
                        materia={questoes.materia}
                        topico={questoes.topico}
                        />
                    )}

            </div>
                <Button className="w-1/3 bg-white text-black mt-12 border-1 border-b-cyan-100 p-3">
                    <Image
                    src="/adicionar.svg"
                    alt="plus"            
                    width = {18}
                    height={18}
                    />
                    Criar nova lista
                </Button>

    </div>

    
)
}

