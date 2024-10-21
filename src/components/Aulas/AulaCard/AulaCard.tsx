import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Settings, UserPlus } from "lucide-react";
import { InscreverAlunoModal } from '@/components/Modal/InscreverAlunoModal';
import AulaModal from '@/components/Modal/AulaModal';
import api from '@/api/axios';
import { Aluno } from '@/components/Alunos/Interface/iAluno';

interface Aula {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  video?: string;
  tipo: string;
  data: string;
  horario: string;
  numeroVagas: number;
  alunosInscritos?: Aluno[];
}

interface AulaCardProps {
  aula: Aula;
  onClick: () => void;
  onManageClick: () => void;
  className?: string;
}

const AulaCard: React.FC<AulaCardProps> = ({ aula, onClick, onManageClick, className }) => {
  const { id, nome, descricao, foto, tipo, data, horario } = aula;
  const [isInscreverModalOpen, setIsInscreverModalOpen] = useState(false);
  const [isAulaModalOpen, setIsAulaModalOpen] = useState(false);
  const [aulaCompleta, setAulaCompleta] = useState<Aula | null>(null);

  // Função para buscar os dados completos da aula
  const fetchAulaCompleta = async (aulaId: number) => {
    try {
      console.log("Buscando dados da aula...");
      const response = await api.get(`/Aulas/GET/${aulaId}`);
      setAulaCompleta(response.data);
      console.log("Dados da aula carregados:", response.data);
      return true;
    } catch (error) {
      console.error("Erro ao buscar dados da aula:", error);
      return false;
    }
  };

  const handleOpenManageModal = async () => {
    console.log("Clicado para gerenciar aula...");
    const success = await fetchAulaCompleta(id);
    if (success) {
      console.log("Abrindo modal de gerenciamento...");
      setIsAulaModalOpen(true);
    }
  };

  return (
    <>
      <Card
        key={id}
        className={`hover:shadow-lg transition-shadow duration-300 cursor-pointer w-80 bg-white rounded-lg overflow-hidden shadow-md ${className}`}
        onClick={onClick}
      >
        <CardHeader className="p-0 relative">
          <img
            src={foto}
            alt={`Imagem da aula ${nome}`}
            className="w-full h-48 object-cover"
          />
        </CardHeader>

        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-gray-900">{nome}</h2>
            <span className="text-sm font-medium text-gray-500">{tipo}</span>
          </div>
          <div className="mt-2 text-sm text-gray-600 h-16 overflow-y-auto">
            {descricao}
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600"><strong>Data:</strong> {new Date(data).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600"><strong>Horário:</strong> {horario}</p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between p-4 border-t border-gray-200 bg-gray-50">
          <button
            className="flex items-center gap-2 text-indigo-600 font-semibold"
            onClick={(event) => {
              event.stopPropagation();
              handleOpenManageModal();
            }}
          >
            <Settings className="w-4 h-4" />
            Gerenciar
          </button>

          <button
            className="flex items-center gap-2 text-green-600 font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              setIsInscreverModalOpen(true);
            }}
          >
            <UserPlus className="w-4 h-4" />
            Inscrever Aluno
          </button>
        </CardFooter>
      </Card>

      {/* Modal de Inscrição de Aluno */}
      <InscreverAlunoModal
        isOpen={isInscreverModalOpen}
        onClose={() => setIsInscreverModalOpen(false)}
        aulaId={id}
      />

      {/* Modal de Gerenciamento da Aula */}
      {isAulaModalOpen && aulaCompleta && (
        <AulaModal
          aula={aulaCompleta}
          onClose={() => {
            console.log("Fechando modal de gerenciamento...");
            setIsAulaModalOpen(false);
          }}
          onDelete={() => {
          }}
        />
      )}
    </>
  );
};

export default AulaCard;
