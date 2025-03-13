'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { User } from '@/lib/api.model'

interface UsersListProps {
  initialUsers: User[]
}

export function UsersList({ initialUsers }: UsersListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(initialUsers)

  useEffect(() => {
    const filtered = initialUsers.filter(user => {
      const searchTermLower = searchTerm.toLowerCase()
      return (
        user.name.toLowerCase().includes(searchTermLower) ||
        user.username.toLowerCase().includes(searchTermLower)
      )
    })
    setFilteredUsers(filtered)
  }, [searchTerm, initialUsers])

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar por nombre o usuario..."
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          className="pl-8"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map(user => (
          <Link key={user.id} href={`/users/${user.id}`}>
            <Card className="h-full cursor-pointer transition-colors hover:bg-accent/50">
              <CardHeader className="pb-2">
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>@{user.username}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <div className="mb-1 flex items-center">
                    <span className="mr-2 font-medium">Email:</span>
                    <span className="text-muted-foreground">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 font-medium">Website:</span>
                    <span className="text-muted-foreground">
                      {user.website}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="py-10 text-center">
          <p className="text-muted-foreground">No se encontraron usuarios</p>
        </div>
      )}
    </div>
  )
}
