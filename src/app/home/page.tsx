"use client";
import { useEffect, useState } from "react";
import { useQueryGetAllAlunos } from "@/hooks/Pageinicial/useQueryGetAll";
import { useQueryGetAllPlanos } from "@/hooks/Alunos/UseQueryGetAllPlanos";
import { useQueryGetAllAulas } from "@/hooks/Pageinicial/useQueryGetAllAulas";
import { useQueryGetMensalidadesPendentes } from "@/hooks/Alunos/useQueryGetMensalidadesPendentes";
import { useQueryGetAllAparelhos } from "@/hooks/Pageinicial/useQueryGetAllAparelhos";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebase/firebase";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Modal from "@/components/Modal/DetalhesDashModal";
import { FaUser, FaClipboardList, FaChalkboardTeacher, FaMoneyCheckAlt, FaTools, FaUserTie } from "react-icons/fa"; // Ícones importados

import { Aluno } from "@/components/Alunos/Interface/iAluno";
import { iPlanos } from "@/components/Alunos/Interface/iPlanos";
import { Mensalidade } from "@/components/Alunos/Interface/iMensalidade";
import { Aparelho } from "@/components/Aparelhos/Interface/iAparelhos";
import { Aula } from "@/components/Aulas/Interface/iAula"; // Adicionado import de Aula

export default function Dashboard() {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState<any>(null); // Usando `any` aqui

  const { data: alunos } = useQueryGetAllAlunos();
  const { data: planos } = useQueryGetAllPlanos();
  const { data: aulas } = useQueryGetAllAulas();
  const { data: mensalidadesPendentes } = useQueryGetMensalidadesPendentes();
  const { data: aparelhos } = useQueryGetAllAparelhos();

  const professores = alunos?.filter(aluno => aluno.tipo === "professor");

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/auth");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    setDate(currentDate);
  }, []);

  const handleCardClick = (type: string) => {
    switch (type) {
      case "aulas":
        setModalData(aulas || []); // Aula[]
        break;
      case "alunos":
        setModalData(alunos || []); // Aluno[]
        break;
      case "planos":
        setModalData(planos || []); // iPlanos[]
        break;
      case "mensalidades":
        setModalData(mensalidadesPendentes || []); // Mensalidade[]
        break;
      case "aparelhos":
        setModalData(aparelhos?.filter(a => a.manutencao) || []); // Aparelho[]
        break;
      case "professores":
        setModalData(professores || []); // Aluno[] (somente os professores)
        break;
      default:
        setModalData(null);
    }
  };

  const closeModal = () => setModalData(null);

  if (loading) {
    return <div>Carregando dashboard...</div>;
  }

  return (
    <div className="w-full h-full p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-4">Dashboard Gerencial</h1>
      <h4 className="text-xl text-center text-gray-600 mb-10">Data: {date}</h4>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        <Card title="Total de Alunos" count={alunos?.length || 0} Icon={FaUser} onClick={() => handleCardClick("alunos")} />
        <Card title="Planos Ativos" count={planos?.length || 0} Icon={FaClipboardList} onClick={() => handleCardClick("planos")} />
        <Card title="Aulas Disponíveis" count={aulas?.length || 0} Icon={FaChalkboardTeacher} onClick={() => handleCardClick("aulas")} />
        <Card title="Mensalidades Pendentes" count={mensalidadesPendentes?.length || 0} Icon={FaMoneyCheckAlt} onClick={() => handleCardClick("mensalidades")} />
        <Card title="Aparelhos em Manutenção" count={aparelhos?.filter(a => a.manutencao).length || 0} Icon={FaTools} onClick={() => handleCardClick("aparelhos")} />
        <Card title="Professores" count={professores?.length || 0} Icon={FaUserTie} onClick={() => handleCardClick("professores")} />
      </div>

      <h3 className="text-2xl font-semibold text-center mb-6">Distribuição de Alunos por Plano</h3>
      <div className="w-full h-96">
        <ResponsiveContainer>
          <BarChart data={planos?.map(plano => ({
            name: plano.nome,
            alunos: alunos?.filter(aluno =>
              aluno.mensalidades?.some(mensalidade => 
                mensalidade.plano && typeof mensalidade.plano === 'object' && 'id' in mensalidade.plano && 
                (mensalidade.plano as iPlanos).id === plano.id
              )
            ).length || 0
          })) || []}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="alunos" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {modalData && <Modal data={modalData} onClose={closeModal} />}
    </div>
  );
}

// Componente para os cards interativos
function Card({ title, count, Icon, onClick }: { title: string, count: number, Icon: any, onClick: () => void }) {
  return (
    <div
      className="p-6 bg-white shadow-lg rounded-lg cursor-pointer transition transform hover:scale-105"
      onClick={onClick}
    >
      <div className="flex items-center justify-center mb-4">
        <Icon className="text-indigo-600 text-4xl" /> {/* Ícone centralizado */}
      </div>
      <h3 className="text-2xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-4xl font-bold text-center text-indigo-600">{count}</p>
    </div>
  );
}
