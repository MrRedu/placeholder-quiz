import { ArrowLeft, Building, Globe, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getUser } from '@/lib/api'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalles del usuario',
}

interface UserDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params

  try {
    const user = await getUser(id)

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/users">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{user.name}</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Nombre de usuario
                </p>
                <p className="font-medium">@{user.username}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="flex items-center font-medium">
                  <Phone className="mr-2 h-4 w-4" />
                  {user.phone}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Website</p>
                <p className="flex items-center font-medium">
                  <Globe className="mr-2 h-4 w-4" />
                  {user.website}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dirección</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4" />
                  <div>
                    <p>
                      {user.address.street}, {user.address.suite}
                    </p>
                    <p>
                      {user.address.city}, {user.address.zipcode}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compañía</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <Building className="mt-0.5 h-4 w-4" />
                  <div>
                    <p className="font-medium">{user.company.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {`"{user.company.catchPhrase}"`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user.company.bs}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        <div className="text-center">
          <Button asChild>
            <Link href={`/posts?userId=${user.id}`}>
              Ver publicaciones de {user.name}
            </Link>
          </Button>
        </div>
      </div>
    )
  } catch {
    notFound()
  }
}
