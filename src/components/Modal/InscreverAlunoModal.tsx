import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Aluno } from '@/components/Alunos/Interface/iAluno';
import axios from 'axios';

// Props para o modal de inscrição
interface InscreverAlunoModalProps {
  isOpen: boolean;
  onClose: () => void;
  aulaId: number; // ID da aula para inscrever o aluno
}

export const InscreverAlunoModal: React.FC<InscreverAlunoModalProps> = ({ isOpen, onClose, aulaId }) => {
  const [alunos, setAlunos] = useState<Aluno[]>([]); // Alunos da API
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null); // Aluno selecionado

  useEffect(() => {
    if (isOpen) {
      // Buscar alunos quando o modal abrir
      axios.get('/api/Alunos/GetAll')
        .then((response) => {
          setAlunos(response.data);
        })
        .catch((error) => {
          console.error('Erro ao buscar alunos:', error);
        });
    }
  }, [isOpen]);

  // Função para inscrever o aluno selecionado
  const handleInscrever = () => {
    if (!selectedAluno) {
      alert("Por favor, selecione um aluno.");
      return;
    }

    // Fazer a requisição de inscrição do aluno na aula
    axios.post(`/api/Aulas/inscrever`, { alunoId: selectedAluno.id, aulaId })
      .then((response) => {
        alert(`Aluno ${selectedAluno.nome} inscrito com sucesso!`);
        onClose(); // Fechar o modal após a inscrição
      })
      .catch((error) => {
        console.error('Erro ao inscrever aluno:', error);
        alert('Erro ao inscrever aluno. Tente novamente.');
      });
  };

  if (!isOpen) return null; // Não renderiza o modal se não estiver aberto

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Inscrever Aluno na Aula</h2>
        
        <select
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          onChange={(e) => {
            const alunoId = Number(e.target.value);
            const aluno = alunos.find(a => a.id === alunoId) || null;
            setSelectedAluno(aluno);
          }}
        >
          <option value="" disabled selected>
            Selecione um aluno
          </option>
          {alunos.map((aluno) => (
            <option key={aluno.id} value={aluno.id}>
              {aluno.id} - {aluno.nome}
            </option>
          ))}
        </select>

        {selectedAluno && (
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Detalhes do Aluno</h3>
            <img
              src={selectedAluno.fotoBase64}
              alt={`${selectedAluno.nome} foto`}
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <p><strong>Nome:</strong> {selectedAluno.nome}</p>
            <p><strong>Email:</strong> {selectedAluno.email}</p>
            <p><strong>Telefone:</strong> {selectedAluno.telefone}</p>
            <p><strong>Data de Nascimento:</strong> {new Date(selectedAluno.dataNascimento).toLocaleDateString()}</p>
            <p><strong>Objetivos:</strong> {selectedAluno.objetivos}</p>
            <p><strong>Status:</strong> {selectedAluno.ativo ? 'Ativo' : 'Inativo'}</p>
            <p><strong>Endereço:</strong> {selectedAluno.enderecos[0]?.rua}, {selectedAluno.enderecos[0]?.numero}, {selectedAluno.enderecos[0]?.bairro}, {selectedAluno.enderecos[0]?.cidade} - {selectedAluno.enderecos[0]?.estado}</p>
            <p><strong>Mensalidade Pendente:</strong> {selectedAluno.mensalidades[0]?.status === 'Pendente' ? 'Sim' : 'Não'}</p>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <Button onClick={onClose} className="mr-2">Cancelar</Button>
          <Button onClick={handleInscrever} className="bg-green-600 text-white">Inscrever</Button>
        </div>
      </div>
    </div>
  );
};
