import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Button } from "@/components/ui/button";
import {Trash2, FileUp, FolderOpen } from 'lucide-react';

interface propsCaixa {
    materia: string,
    topico?: string,
    descricao: string,
    hifen?: string,
    corTitulo:string
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
                    <FolderOpen />
                        abrir
                    </Button>

                    <Button className="w-fit bg-white text-black m-3 rounded-sm hover:bg-gray-400">
                        <FileUp/>
                        exportar
                    </Button>

                    <Button className="w-fit bg-red-500 text-black rounded-sm hover:bg-gray-400">
                        <Trash2 />
                        apagar
                        </Button>
                </CardContent>

            </Card>
        </div>
    )
}