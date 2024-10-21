import React from 'react';
import { Aluno } from '@/components/Alunos/Interface/iAluno';
import { FaTimes } from 'react-icons/fa';

interface AlunoModalProps {
  aluno: Aluno;
  onClose: () => void; // Função para fechar o modal
}

const AlunoModal: React.FC<AlunoModalProps> = ({ aluno, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative">
        {/* Botão de Fechar */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        {/* Cabeçalho com Nome e Foto */}
        <div className="flex items-center mb-6">
          <img 
            src={aluno.fotoBase64} 
            alt={`${aluno.nome} foto`} 
            className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 mr-6"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{aluno.nome}</h2>
            <p className="text-gray-600">{aluno.tipo}</p>
            <p className={`font-semibold ${aluno.ativo ? 'text-green-600' : 'text-red-600'}`}>
              {aluno.ativo ? 'Ativo' : 'Inativo'}
            </p>
          </div>
        </div>

        {/* Detalhes do Aluno */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p><strong>Email:</strong> {aluno.email}</p>
            <p><strong>Telefone:</strong> {aluno.telefone}</p>
            <p><strong>Data de Nascimento:</strong> {new Date(aluno.dataNascimento).toLocaleDateString()}</p>
            <p><strong>Data de Cadastro:</strong> {new Date(aluno.dataCadastro).toLocaleDateString()}</p>
            <p><strong>Objetivos:</strong> {aluno.objetivos}</p>
          </div>

          {/* Endereços */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Endereços</h3>
            {aluno.enderecos.length ? (
              aluno.enderecos.map((endereco) => (
                <div key={endereco.id} className="mb-4">
                  <p>{endereco.rua}, {endereco.numero}</p>
                  {endereco.complemento && <p>Complemento: {endereco.complemento}</p>}
                  <p>{endereco.bairro}, {endereco.cidade} - {endereco.estado}</p>
                  <p>{endereco.codigoPostal}, {endereco.pais}</p>
                </div>
              ))
            ) : (
              <p>Nenhum endereço registrado.</p>
            )}
          </div>
        </div>

        {/* Mensalidades */}
        <h3 className="text-lg font-bold text-gray-800 mb-2">Mensalidades</h3>
        {aluno.mensalidades.length ? (
          <table className="w-full table-auto mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Plano</th>
                <th className="px-4 py-2 text-left">Valor</th>
                <th className="px-4 py-2 text-left">Vencimento</th>
                <th className="px-4 py-2 text-left">Pagamento</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {aluno.mensalidades.map((mensalidade) => (
                <tr key={mensalidade.id} className="border-b">
                  <td className="px-4 py-2">{mensalidade.plano || 'N/A'}</td>
                  <td className="px-4 py-2">R$ {mensalidade.valorMensalidade.toFixed(2)}</td>
                  <td className="px-4 py-2">{new Date(mensalidade.dataVencimento).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    {mensalidade.dataPagamento
                      ? new Date(mensalidade.dataPagamento).toLocaleDateString()
                      : 'Pendente'}
                  </td>
                  <td className={`px-4 py-2 font-semibold ${mensalidade.status === 'Pago' ? 'text-green-600' : mensalidade.status === 'Atrasado' ? 'text-red-600' : 'text-yellow-500'}`}>
                    {mensalidade.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma mensalidade registrada.</p>
        )}

        {/* Botão de Fechar (Redundante para acessibilidade) */}
        <button 
          onClick={onClose} 
          className="bg-gray-500 text-white rounded-lg px-4 py-2 hover:bg-gray-600 w-full"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

export default AlunoModal;
