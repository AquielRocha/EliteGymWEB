import { Button } from "@/components/ui/button";
import { FaTrash, FaEdit } from 'react-icons/fa'; // Ícones para edição e exclusão
import { useRouter } from 'next/navigation'; // Para navegação e edição

interface Aula {
  id: number;
  nome: string;
  descricao: string;
  data: string;
  horario: string;
  tipo: string;
  foto: string;
}

interface AulaModalProps {
  aula: Aula | null;
  onClose: () => void;
  onDelete: () => void;
}

const AulaModal: React.FC<AulaModalProps> = ({
  aula,
  onClose,
  onDelete,
}) => {
  const router = useRouter();

  // Caso a aula seja nula, o modal não deve ser exibido
  if (!aula) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">{aula.nome}</h2>
        <p className="mb-4 text-gray-600">{aula.descricao}</p>

        <div className="mb-4">
          <p className="text-gray-600"><strong>Data:</strong> {aula.data}</p>
          <p className="text-gray-600"><strong>Horário:</strong> {aula.horario}</p>
          <p className="text-gray-600"><strong>Tipo:</strong> {aula.tipo}</p>
        </div>

        {aula.foto && (
          <div className="mb-4">
            <img
              src={aula.foto}
              alt={`Imagem da aula ${aula.nome}`}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}

        {/* Botão para editar a aula */}
        <Button
          onClick={() => router.push(`/home/Aulas/AddAula?id=${aula.id}`)}
          className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white w-full mt-4"
        >
          <FaEdit className="w-4 h-4" />
          Editar Aula
        </Button>

        {/* Botão para excluir a aula */}
        <Button
          onClick={onDelete}
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white w-full mt-4"
        >
          <FaTrash className="w-4 h-4" />
          Excluir Aula
        </Button>
      </div>
    </div>
  );
};

export default AulaModal;
