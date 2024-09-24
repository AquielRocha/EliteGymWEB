import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h2 className="text-4xl font-bold mb-20   text-black">Página em Desenvolvimento... </h2>
      <p className="text-lg  text-white">Em processo...</p>
     <Link href="/home" className="text-blue-500 hover:underline">      <Button> Volte       </Button></Link>

    </div>
  )
}