// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token'); // Verifica o token de autenticação do cookie

  if (!token) {
    // Se não houver token, redireciona para a página de login
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  return NextResponse.next(); // Permite o acesso se o token estiver presente
}

// Defina as rotas para aplicar o middleware
export const config = {
  matcher: ['/home', '/alunos/:path*', '/aulas/:path*', '/aparelhos/:path*'], // Rotas protegidas
};
