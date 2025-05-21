import { Page } from "@/components/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Steps } from "./steps";

export default function AdicionarQuestaoPage() {
  return (
    <Page items={[{ label: "Adicionar Questão" }]} title={<></>}>
      <Card className="">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Cadastro de Questão
          </CardTitle>
          <CardDescription>
            Preencha os campos abaixo para cadastras uma nova questão.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Steps />
        </CardContent>
      </Card>
    </Page>
  );
}
