import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Star, Settings } from "lucide-react";

interface AparelhoCardProps {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  categoria: string;
  manutencao: boolean;
  favorite: boolean;
  onClick: () => void;
  className?: string;  // Adiciona a propriedade className como opcional
}

const AparelhoCard: React.FC<AparelhoCardProps> = ({
  id,
  nome,
  descricao,
  foto,
  categoria,
  manutencao,
  favorite,
  onClick,
  className // Recebe a className aqui
}) => {
  return (
    <Card
      key={id}
      className={`hover:shadow-lg transition-shadow duration-300 cursor-pointer w-80 bg-white rounded-lg overflow-hidden shadow-md ${className}`} // Aplica a className recebida
      onClick={onClick}
    >
      {/* Imagem do Aparelho */}
      <CardHeader className="p-0">
        {foto ? (
          <img src={foto} alt={nome} className="w-full h-48 object-cover" />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <Image className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
      </CardHeader>

      {/* Conteúdo do Card */}
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-900">{nome}</h2>
          <span className="text-sm font-medium text-gray-500">{categoria}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600">{descricao}</p>
      </CardContent>

      {/* Footer com Botões */}
      <CardFooter className="flex justify-between p-4 border-t border-gray-200 bg-gray-50">
        <Button variant="outline" className="flex items-center gap-2 text-indigo-600 font-semibold">
          <Star className="w-4 h-4" />
          Favorito
        </Button>
        <Button variant="outline" className="flex items-center gap-2 text-indigo-600 font-semibold">
          <Settings className="w-4 h-4" />
          Gerenciar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AparelhoCard;