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
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
      <h1 style={{ fontSize: "2em", color: "#333", textAlign: "center" }}>Bem-vindo Undefined a Página Inicial!</h1>
      <h4 style={{ fontSize: "1.2em", color: "#666", textAlign: "center" }}>Data: {date}</h4>
   
   
      <iframe
        title="Dashboard do Power BI"
        width="100%"
        height="100%"
        src="https://app.powerbi.com/view?r=eyJrIjoiMGVmNTFlYTktOTk1NS00MDI2LWJmMDMtYWM1ZTQ5M2Y2NDQzIiwidCI6ImMxNGUyYjU2LWM1YmMtNDNiZC1hZDljLTQwOGNmNmNjMzU2MCJ9" 
        frameBorder="0"
        allowFullScreen
        style={{ border: "none" }}
      ></iframe>

      {error && <p>Erro ao carregar</p>}
    </div>
  );
}
