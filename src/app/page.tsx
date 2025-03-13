import { FileText, Users } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto mb-10 max-w-3xl space-y-3 text-center">
        <h1 className="text-3xl font-bold">
          Bienvenido a JSONPlaceholder Explorer
        </h1>
        <p className="text-muted-foreground">
          Una aplicación construida con Next.js, TypeScript, shadcn/ui y
          TanStack Query para explorar datos de JSONPlaceholder API.
        </p>
      </div>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Usuarios
            </CardTitle>
            <CardDescription>
              Explora la lista de usuarios y sus detalles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Visualiza todos los usuarios, filtra por nombre o usuario, y
              consulta información detallada.
            </p>
            <Button asChild>
              <Link href="/users">Ver Usuarios</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Publicaciones
            </CardTitle>
            <CardDescription>
              Explora publicaciones y comentarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Visualiza todas las publicaciones, ordena por título, y añade
              comentarios a las publicaciones.
            </p>
            <Button asChild>
              <Link href="/posts">Ver Publicaciones</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
