'use client';

import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react"; // Importando ícones do Lucide
import { Switch } from "@/components/ui/switch";

const Auth = () => {
  // Estado para o switch "Lembrar de mim"
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Ajuste de largura e altura do container principal */}
      <div className="bg-white shadow-lg rounded-lg flex w-3/4 h-[800px]"> {/* Ajustando a altura fixa */}
        {/* Seção de Cadastro */}
        <div className="w-1/2 bg-blue-500 p-10 rounded-l-lg flex flex-col justify-center items-center">
          <h2 className="text-white text-3xl font-bold mb-8">ELITE GYM</h2>
          <form className="w-3/4"> {/* Reduzindo a largura do formulário */}
            <div className="mb-6 relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Usuário"
                className="w-full p-4 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-6 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-6 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Crie uma senha"
                className="w-full p-4 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-6 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Repita a senha"
                className="w-full p-4 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <button className="w-full bg-blue-700 text-white py-4 rounded-md hover:bg-blue-800 transition duration-300">
              Cadastrar
            </button>
          </form>
        </div>

        {/* Seção de Login */}
        <div className="w-1/2 p-10 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-8">ELITE GYM</h2>
          <form className="w-3/4"> {/* Reduzindo a largura do formulário */}
            <div className="mb-6 relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Usuário"
                className="w-full p-4 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-6 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Senha"
                className="w-full p-4 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-6 flex items-center justify-between">
              {/* Switch para "Lembrar de mim" */}
              <label className="flex items-center space-x-2">
                <Switch
                  checked={isChecked}
                  onCheckedChange={setIsChecked}
                />
                <span>Lembrar de mim</span>
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                Redefinir a senha
              </a>
            </div>
            <button className="w-full bg-blue-700 text-white py-4 rounded-md hover:bg-blue-800 transition duration-300">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
