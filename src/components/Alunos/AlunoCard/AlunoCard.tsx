import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, CreditCard, User } from "lucide-react";

interface Aluno {
  id: string;
  foto: string; // A string Base64 da foto
  nome: string;
  tipo: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  statusPagamento: string;
  ativo: boolean;
  onClick: () => void; // Função para lidar com o clique
}

function getInitials(name: string): string {
  const names = name.split(" ");
  const initials = names.map((n) => n[0]).join("");
  return initials.toUpperCase();
}

function getStatusColor(status: string): string {
  switch (status) {
    case "Pago":
      return "bg-green-500"; // cor para pago
    case "Pendente":
      return "bg-yellow-500"; // cor para pendente
    case "Atrasado":
      return "bg-red-500"; // cor para atrasado
    default:
      return "bg-gray-500"; // cor padrão
  }
}

const AlunoCard: React.FC<Aluno> = ({
  id,
  foto,
  nome,
  tipo,
  email,
  telefone,
  dataNascimento,
  statusPagamento,
  ativo,
  onClick,
}) => {
  const dataFormatada = new Date(dataNascimento).toLocaleDateString();

  return (
    <Card key={id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={onClick}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          {foto ? (
            <img src={foto} alt={nome} className="w-12 h-12 rounded-full" />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              {getInitials(nome)}
            </div>
          )}
          <div>
            <h2 className="text-lg font-semibold">{nome}</h2>
            <p className="text-sm text-muted-foreground">{tipo}</p>
          </div>
        </div>
        <Badge variant={ativo ? "default" : "secondary"}>
          <User className="w-3 h-3 mr-1" />
          {ativo ? "Ativo" : "Inativo"}
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className="text-sm">{email}</span>
        </div>
        <div className="flex items-center">
          <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className="text-sm">{telefone}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className="text-sm">{dataFormatada}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge variant="outline" className={`${getStatusColor(statusPagamento)} text-white`}>
          <CreditCard className="w-3 h-3 mr-1" />
          {statusPagamento}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default AlunoCard;
