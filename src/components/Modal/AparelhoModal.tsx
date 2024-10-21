import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { FaTrash, FaEdit, FaWrench } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface Aparelho {
  id: number;
  nome: string;
  descricao: string;
  manutencao: boolean;
  favorite: boolean;
  foto: string;
  categoria: string;
}

interface AparelhoModalProps {
  aparelho: Aparelho | null;
  onClose: () => void;
  onDelete: () => void;
  onToggleManutencao: () => void;
}

const AparelhoModal: React.FC<AparelhoModalProps> = ({
  aparelho,
  onClose,
  onDelete,
  onToggleManutencao,
}) => {
  const { register, reset } = useForm<Aparelho>();
  const router = useRouter();

  useEffect(() => {
    if (aparelho) {
      reset(aparelho);
    }
  }, [aparelho, reset]);

  if (!aparelho) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">{aparelho.nome}</h2>
        <p className="mb-4 text-gray-600">{aparelho.descricao}</p>

        {/* Editar Aparelho */}
        <Button
          onClick={() => router.push(`/home/Aparelhos/AddAparelho?id=${aparelho.id}`)}
          className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white w-full"
        >
          <FaEdit className="w-4 h-4" />
          Editar Aparelho
        </Button>

        {/* Marcar como manutenção */}
        <Button
          onClick={onToggleManutencao}
          className={`flex items-center justify-center gap-2 ${aparelho.manutencao ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white w-full mt-4`}
        >
          <FaWrench className="w-4 h-4" />
          {aparelho.manutencao ? 'Remover de Manutenção' : 'Marcar como Manutenção'}
        </Button>

        {/* Excluir Aparelho */}
        <Button
          onClick={onDelete}
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white w-full mt-4"
        >
          <FaTrash className="w-4 h-4" />
          Excluir Aparelho
        </Button>
      </div>
    </div>
  );
};

export default AparelhoModal;
