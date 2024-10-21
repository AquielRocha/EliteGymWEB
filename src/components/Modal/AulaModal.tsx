import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Aluno } from '@/components/Alunos/Interface/iAluno';

interface Aula {
  id: number;
  nome: string;
  descricao: string;
  data: string;
  horario: string;
  tipo: string;
  foto: string;
  video?: string;
  numeroVagas: number;
  alunosInscritos?: Aluno[];
}

interface AulaModalProps {
  aula: Aula;
  onClose: () => void;
  onDelete: () => void;
}

const AulaModal: React.FC<AulaModalProps> = ({ aula, onClose, onDelete }) => {
  const router = useRouter();

  const vagasRestantes = aula.numeroVagas - (aula.alunosInscritos?.length || 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity ease-out duration-300">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
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
          <p className="text-gray-600"><strong>Vagas restantes:</strong> {vagasRestantes}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Alunos Inscritos:</h3>
          {aula.alunosInscritos && aula.alunosInscritos.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {aula.alunosInscritos.map((aluno) => (
                <li key={aluno.id} className="border-b py-2 flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      src={aluno.fotoBase64}
                      alt={`${aluno.nome} foto`} 
                      className="w-12 h-12 object-cover rounded-full border-2 border-gray-300 mr-4"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{aluno.nome}</p>
                    <p className="text-xs text-gray-500">{aluno.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Nenhum aluno inscrito.</p>
          )}
        </div>


        <div className="flex justify-between mt-6">
          <Button
            onClick={() => router.push(`/home/Aulas/AddAula?id=${aula.id}`)}
            className="flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white w-1/2 transition duration-200 ease-in-out"
          >
            <FaEdit className="w-4 h-4" />
            Editar Aula
          </Button>

          <Button
            onClick={onDelete}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white w-1/2 transition duration-200 ease-in-out"
          >
            <FaTrash className="w-4 h-4" />
            Excluir Aula
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AulaModal;
