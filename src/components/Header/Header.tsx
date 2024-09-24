'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Dumbbell, User, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu" // Importando os componentes do dropdown

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/home' },
    { name: 'Alunos - Professores', href: '/home/Alunos' },
    { name: 'Aulas', href: '/home/Aulas' },
    { name: 'Aparelhos', href: '/Aparelhos' },
    { name: 'Opções', href: '/Settings' },
  ]

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Dumbbell className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold text-primary">EliteGym</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              item.name === 'Opções' ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href="/Settings" className="w-full">
                        Configurações
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/Profile" className="w-full">
                        Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/Logout" className="w-full">
                        Sair
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <User />
            <Button>Logout</Button>
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <span className="sr-only">Open menu</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Button className="mt-4" onClick={() => setIsOpen(false)}>Sign Up</Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
