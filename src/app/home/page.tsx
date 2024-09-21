"use client";
import { useQueryGetAllAlunos } from "@/hooks/Pageinicial/useQueryGetAll";
import { useEffect, useState } from "react";

export default function PaginaInicial() {
  const [date, setDate] = useState("");
  const { data, error, isLoading, refetch } = useQueryGetAllAlunos();

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    setDate(currentDate); // Gera a data no cliente
  }, []);

  return (
    <div>
      <h1>Bem-vindo à Página Inicial</h1>
      <p>Data: {date}</p>
      <button onClick={() => refetch()}>Recarregar</button>
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar</p>}

    </div>
  );
}
