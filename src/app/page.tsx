"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const router = useRouter();


  useEffect(() => {
    // Redireciona o usuário para a página de autenticação ao carregar a aplicação
    router.push("/auth");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      
      <main className="flex flex-col gap-8 items-center">
        <h1>aguarde...</h1>
      </main>
    </div>
  );
}
