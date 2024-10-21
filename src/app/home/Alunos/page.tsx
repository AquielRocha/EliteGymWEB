"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useQueryGetAllAlunos } from "@/hooks/Pageinicial/useQueryGetAll";
import Loader from '@/components/Loader';
import AlunoCard from '@/components/Alunos/AlunoCard/AlunoCard';
import { useRouter } from 'next/navigation';
import { Aluno } from '@/components/Alunos/Interface/iAluno';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaRegMoneyBillAlt, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const tiposUsuarios = [
  { label: "Todos", value: "" },
  { label: "Alunos", value: "aluno" },
  { label: "Professores", value: "professor" },
];

export default function Alunos() {
  const router = useRouter();
  const { data, error, isLoading, refetch } = useQueryGetAllAlunos();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [tipoUsuario, setTipoUsuario] = useState<string>(''); 
  const [filteredAlunos, setFilteredAlunos] = useState<Aluno[]>([]); // Adicionando o estado para alunos filtrados

  const handleAddAluno = () => router.push('Alunos/AddAluno');

  useEffect(() => {
    if (data) {
      // Lógica para filtrar alunos/professores com base no termo de pesquisa e tipo selecionado
      const filtered = data.filter((aluno: Aluno) => {
        const matchesSearch = aluno.nome.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTipo = tipoUsuario === "" || aluno.tipo === tipoUsuario;
        return matchesSearch && matchesTipo;
      });

      setFilteredAlunos(filtered);
    }
  }, [data, searchTerm, tipoUsuario]);

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="text-center mt-6">
        <p className="text-red-600">Erro ao carregar alunos.</p>
      </div>
    );
  }

  const handleCloseModal = () => setModalVisible(false);

  return (
    <div className="p-6">
      {/* Cabeçalho da Página */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-700">Lista de Alunos e Professores</h1>
        <Button onClick={handleAddAluno} className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300">
          Adicionar Usuário
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex justify-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nome..."
          className="border border-gray-300 rounded-md p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-md p-2"
          value={tipoUsuario}
          onChange={(e) => setTipoUsuario(e.target.value)}
        >
          {tiposUsuarios.map((tipo) => (
            <option key={tipo.value} value={tipo.value}>
              {tipo.label}
            </option>
          ))}
        </select>
      </div>

      {/* Grid de Alunos/Professores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto">
        {filteredAlunos?.length ? (
          filteredAlunos.map((aluno: Aluno) => (
            <AlunoCard
              key={aluno.id}
              aluno={aluno}
              onView={() => {
                setSelectedAluno(aluno);
                setModalVisible(true);
              }}
              onManage={() => {
                console.log('Gerenciar aluno', aluno);
              }}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">Nenhum usuário encontrado.</p>
          </div>
        )}
      </div>

      {/* Modal de Detalhes do Aluno */}
      {modalVisible && selectedAluno && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl relative">
            {/* Nome e Foto */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-900 mb-2">{selectedAluno?.nome}</h2>
              <img
                src={selectedAluno?.fotoBase64}
                alt={`${selectedAluno?.nome} foto`}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-gray-200"
              />
            </div>

            {/* Detalhes básicos do Aluno */}
            <div className="space-y-4 text-center text-gray-700">
              <p className="flex justify-center items-center gap-2">
                <FaEnvelope className="text-indigo-600" /> 
                <span>{selectedAluno?.email}</span>
              </p>
              <p className="flex justify-center items-center gap-2">
                <FaPhone className="text-green-600" /> 
                <span>{selectedAluno?.telefone}</span>
              </p>
              <p className="flex justify-center items-center gap-2">
                {selectedAluno?.ativo ? (
                  <FaCheckCircle className="text-green-600" />
                ) : (
                  <FaTimesCircle className="text-red-600" />
                )}
                <span className={`font-semibold ${selectedAluno?.ativo ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedAluno?.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </p>
            </div>

            {/* Divisória */}
            <hr className="my-6 border-gray-300" />

            {/* Endereços */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-indigo-600" /> Endereços
              </h3>
              {selectedAluno?.enderecos.length ? (
                selectedAluno.enderecos.map((endereco, index) => (
                  <div key={index} className="mb-4 text-gray-600">
                    <p>{endereco.rua}, {endereco.numero}</p>
                    {endereco.complemento && <p>Complemento: {endereco.complemento}</p>}
                    <p>{endereco.bairro}, {endereco.cidade} - {endereco.estado}</p>
                    <p>{endereco.codigoPostal}, {endereco.pais}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Nenhum endereço registrado.</p>
              )}
            </div>

            {/* Divisória */}
            <hr className="my-6 border-gray-300" />

            {/* Mensalidades */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaRegMoneyBillAlt className="text-indigo-600" /> Mensalidades
              </h3>
              {selectedAluno?.mensalidades.length ? (
                <table className="w-full table-auto mb-6">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Plano</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Valor</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Vencimento</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Pagamento</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAluno.mensalidades.map((mensalidade, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2 text-gray-600">{mensalidade.plano || 'N/A'}</td>
                        <td className="px-4 py-2 text-gray-600">R$ {mensalidade.valorMensalidade.toFixed(2)}</td>
                        <td className="px-4 py-2 text-gray-600">{new Date(mensalidade.dataVencimento).toLocaleDateString()}</td>
                        <td className="px-4 py-2 text-gray-600">
                          {mensalidade.dataPagamento
                            ? new Date(mensalidade.dataPagamento).toLocaleDateString()
                            : 'Pendente'}
                        </td>
                        <td className={`px-4 py-2 font-semibold flex items-center gap-2 ${mensalidade.status === 'Pago' ? 'text-green-600' : mensalidade.status === 'Atrasado' ? 'text-red-600' : 'text-yellow-500'}`}>
                          {mensalidade.status === 'Pago' ? (
                            <FaCheckCircle />
                          ) : mensalidade.status === 'Atrasado' ? (
                            <FaTimesCircle />
                          ) : (
                            <FaClock />
                          )}
                          {mensalidade.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">Nenhuma mensalidade registrada.</p>
              )}
            </div>

            {/* Botão de Fechar */}
            <button
              onClick={handleCloseModal}
              className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded-lg transition duration-300"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
