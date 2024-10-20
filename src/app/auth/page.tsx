"use client";

import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebase'; 
import { Dumbbell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function Component() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
  
      // Salva o token no cookie
      document.cookie = `token=${token}; path=/; max-age=3600`; // Expira em 1 hora
  
      toast({
        title: "Login bem-sucedido!",
        description: "Você será redirecionado em breve.",
        variant: "default",
        duration: 3000,
      });
  
      setTimeout(() => {
        router.push('/home');
      }, 3000); // Redirecionamento após 3 segundos
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Não foi possível realizar o login. Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    }
  };
  

  const handleRegister = async (e: any) => {
    e.preventDefault();

    // Validação de senha e confirmação de senha
    if (password !== confirmPassword) {
      toast({
        title: "Erro no cadastro",
        description: "As senhas não coincidem. Por favor, tente novamente.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "Cadastro bem-sucedido!",
        description: "Você será redirecionado para a página inicial.",
        variant: "default",
        duration: 3000, // Duração de 3 segundos
      });
      setTimeout(() => {
        router.push('/home');
      }, 3000); // Redirecionamento após 3 segundos
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível realizar o cadastro. Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Dumbbell className="text-gray-500 w-12 h-12" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-500">ELITE GYM</CardTitle>
          <CardDescription>Fortaleça seu corpo, fortaleça sua mente</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastro</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Seu email" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Sua senha" 
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Lembrar de mim
                  </label>
                </div>
                <Button className="w-full bg-black text-white hover:bg-gray-600" type="submit">
                  Entrar 
                </Button>
              </form>
              <div className="mt-4 text-center">
                <a href="#" className="text-sm text-black-500 hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
            </TabsContent>
            <TabsContent value="register">
              <form className="space-y-4" onSubmit={handleRegister}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Seu endereço de email" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Senha</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Crie uma senha forte" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirme a Senha</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="Repita sua senha" 
                    required
                  />
                </div>
                <Button className="w-full bg-black text-white hover:bg-gray-600" type="submit">
                  Começar a Jornada
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
