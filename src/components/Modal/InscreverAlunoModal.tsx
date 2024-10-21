import { useQueryGetAllAlunos } from '@/hooks/Pageinicial/useQueryGetAll';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import AlunoCard from '@/components/Alunos/AlunoCard/AlunoCard';
import api from '@/api/axios';

interface InscreverAlunoModalProps {
  isOpen: boolean;
  onClose: () => void;
  aulaId: number;
}

export const InscreverAlunoModal: React.FC<InscreverAlunoModalProps> = ({ isOpen, onClose, aulaId }) => {
  const [selectedAluno, setSelectedAluno] = useState<number | null>(null);

  const { data: alunos, isLoading, isError, error } = useQueryGetAllAlunos();

  const handleInscrever = () => {
    if (!selectedAluno) {
      alert("Por favor, selecione um aluno.");
      return;
    }
    const apiUrl = `/Aulas/inscrever`;
  
    const queryParams = {
      aulaId: aulaId,
      alunoId: selectedAluno,
    };
  
    console.log('Enviando requisição para:', apiUrl, 'com parâmetros:', queryParams);
  
    api.post(apiUrl, null, { 
      params: queryParams
    })
    .then(() => {
      alert("Aluno inscrito com sucesso!");
      onClose();
    })
    .catch((error) => {
      console.error('Erro ao inscrever aluno:', error);
      alert('Erro ao inscrever aluno.');
    });
  };
  
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"> 
    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 z-50">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Inscrever Aluno na Aula</h2>

      {isLoading && <p>Carregando alunos...</p>}
      {isError && <p className="text-red-500">Erro ao carregar alunos: {error?.message}</p>}

      {alunos && (
        <select
          className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          value={selectedAluno ?? ''} 
          onChange={(e) => setSelectedAluno(Number(e.target.value))}
        >
          <option value="" disabled>Selecione um aluno</option>
          {alunos.map((aluno) => (
            <option key={aluno.id} value={aluno.id}>
              {aluno.id} - {aluno.nome}
            </option>
          ))}
        </select>
      )}

      {selectedAluno && alunos && (
        <AlunoCard
          aluno={alunos.find(aluno => aluno.id === selectedAluno)!}
          onClick={() => setSelectedAluno(selectedAluno)}
        />
      )}

      <div className="flex justify-center mt-6">
      <Button
        onClick={onClose}
        className="mr-2 border border-gray-400 text-gray-600 bg-white hover:bg-gray-100 hover:text-gray-700 transition duration-200"
      >
        Cancelar
      </Button>
        <Button 
          onClick={handleInscrever} 
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Inscrever
        </Button>
      </div>
    </div>
  </div>

  );
};
