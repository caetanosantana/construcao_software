import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import Image from "next/image"
interface propsCaixa {
    materia: string,
    topico?: string,
    descricao: string,
    hifen?: string,
    corTitulo:string;
}

export default function Caixa(props: propsCaixa){
    const materia = props.materia.toLowerCase(); 

    return (
        <div>
            <Card className={materia}>
                <CardHeader>
                    <CardTitle style={{color:`${props.corTitulo}`}}>{props.materia} {props.hifen} {props.topico}</CardTitle>
                    <CardDescription>{props.descricao}</CardDescription>
                </CardHeader>

                <CardContent>
                    <Button className="w-fit bg-white text-black rounded-sm hover:bg-gray-400">
                        <Image
                            src="/folder.svg"
                            alt="folder"            
                            width = {15}
                            height={15}
                        />
                        abrir
                    </Button>

                    <Button className="w-fit bg-white text-black m-1 rounded-sm hover:bg-gray-400">
                        <Image
                            src="/export.svg"
                            alt="export"            
                            width = {15}
                            height={15}
                        />
                        exportar
                    </Button>

                    <Button className="w-fit bg-red-500 text-black rounded-sm hover:bg-gray-400">
                        <Image
                            src="/delete.svg"
                            alt="delete"            
                            width = {15}
                            height={15}
                        />
                        apagar
                        </Button>
                </CardContent>

            </Card>

        </div>
    )
}