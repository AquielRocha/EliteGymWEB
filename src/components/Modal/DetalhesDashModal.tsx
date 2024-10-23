import React from 'react';

interface ModalProps {
  data: any; // Os dados que serão exibidos no modal
  onClose: () => void; // Função para fechar o modal
}

const Modal = ({ data, onClose }: { data: any; onClose: () => void }) => {
  if (!data || data.length === 0) return null;

  // Função para renderizar os dados de acordo com o tipo
  const renderModalContent = () => {
    if (data[0]?.nome && data[0]?.valor !== undefined) {
      // Renderizar Planos
      return (
        <div>
          <h3 className="text-lg font-semibold mb-2">Planos</h3>
          <ul>
            {data.map((plano: any) => (
              <li key={plano.id} className="mb-4">
                <strong>Nome:</strong> {plano.nome} <br />
                <strong>Valor:</strong> R$ {plano.valor.toFixed(2)} <br />
                <strong>Descrição:</strong> {plano.descricao}
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (data[0]?.nome && data[0]?.horario) {
      // Renderizar Aulas
      return (
        <div>
          <h3 className="text-lg font-semibold mb-2">Aulas Disponíveis</h3>
          <ul>
            {data.map((aula: any) => (
              <li key={aula.id} className="mb-4">
                <strong>Nome:</strong> {aula.nome} <br />
                <strong>Descrição:</strong> {aula.descricao} <br />
                <strong>Horário:</strong> {aula.horario} <br />
                <strong>Número de Vagas:</strong> {aula.numeroVagas} <br />
                <strong>Tipo:</strong> {aula.tipo} <br />
                <strong>Data:</strong> {new Date(aula.data).toLocaleDateString()} <br />
                <strong>Alunos Inscritos:</strong>{" "}
                {aula.alunosInscritos?.length || 0}
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (data[0]?.valorMensalidade) {
      // Renderizar Mensalidades
      return (
        <div>
          <h3 className="text-lg font-semibold mb-2">Mensalidades Pendentes</h3>
          <ul>
            {data.map((mensalidade: any) => (
              <li key={mensalidade.id} className="mb-4">
                <strong>Valor:</strong> R$ {mensalidade.valorMensalidade.toFixed(2)} <br />
                <strong>Data de Vencimento:</strong> {new Date(mensalidade.dataVencimento).toLocaleDateString()} <br />
                <strong>Status:</strong> {mensalidade.status} <br />
                <strong>Plano:</strong> {mensalidade.plano ? mensalidade.plano.nome : 'N/A'}
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (data[0]?.manutencao !== undefined) {
      // Renderizar Aparelhos
      return (
        <div>
          <h3 className="text-lg font-semibold mb-2">Aparelhos em Manutenção</h3>
          <ul>
            {data.map((aparelho: any) => (
              <li key={aparelho.id} className="mb-4">
                <strong>Nome:</strong> {aparelho.nome} <br />
                <strong>Descrição:</strong> {aparelho.descricao} <br />
                <strong>Categoria:</strong> {aparelho.categoria} <br />
                <strong>Em Manutenção:</strong> {aparelho.manutencao ? "Sim" : "Não"}
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (data[0]?.email) {
      // Renderizar Alunos ou Professores
      return (
        <div>
          <h3 className="text-lg font-semibold mb-2">
            {data[0].tipo === "professor" ? "Professores" : "Alunos"}
          </h3>
          <ul>
            {data.map((aluno: any) => (
              <li key={aluno.id} className="mb-4">
                <strong>Nome:</strong> {aluno.nome} <br />
                <strong>Email:</strong> {aluno.email} <br />
                <strong>Data de Nascimento:</strong> {new Date(aluno.dataNascimento).toLocaleDateString()} <br />
                <strong>Telefone:</strong> {aluno.telefone} <br />
                <strong>Objetivos:</strong> {aluno.objetivos || "N/A"} <br />
                <strong>Ativo:</strong> {aluno.ativo ? "Sim" : "Não"}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      // Caso outros tipos de dados
      return (
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-3xl w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          Fechar
        </button>
        <h2 className="text-2xl font-bold mb-4">Detalhes</h2>
        <div className="overflow-auto max-h-96">{renderModalContent()}</div>
      </div>
    </div>
  );
};

export default Modal;
