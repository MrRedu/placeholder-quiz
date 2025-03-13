import { getUsers } from '@/lib/api'

import { UsersList } from './users-list'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Usuarios',
}

export default async function UsersPage() {
  // Server Component fetching data
  const users = await getUsers()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <p className="text-muted-foreground">
          Lista de usuarios de JSONPlaceholder. Haz clic en un usuario para ver
          sus detalles.
        </p>
      </div>

      <UsersList initialUsers={users} />
    </div>
  )
}
