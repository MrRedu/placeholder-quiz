'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import type { Post } from '@/lib/api.model'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSearchParams, useRouter } from 'next/navigation'

interface PostsListProps {
  initialPosts: Post[]
}

type SortDirection = 'asc' | 'desc'

export function PostsList({ initialPosts }: PostsListProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const userIdParam = searchParams.get('userId')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])

  // Filter by userId from URL if present
  useEffect(() => {
    let filtered = [...initialPosts]

    // Filter by userId if present
    if (userIdParam) {
      filtered = filtered.filter(
        post => post.userId === Number.parseInt(userIdParam)
      )
    }

    // Filter by search term
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTermLower)
      )
    }

    // Sort by title
    filtered.sort((a, b) => {
      const comparison = a.title.localeCompare(b.title)
      return sortDirection === 'asc' ? comparison : -comparison
    })

    setFilteredPosts(filtered)
  }, [searchTerm, sortDirection, initialPosts, userIdParam])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="w-full md:w-48">
          <Select
            value={sortDirection}
            onValueChange={value => setSortDirection(value as SortDirection)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Título (A-Z)</SelectItem>
              <SelectItem value="desc">Título (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {userIdParam && (
        <div className="flex items-center justify-between rounded-lg bg-muted p-4">
          <p>Filtrando publicaciones del usuario ID: {userIdParam}</p>
          <Button variant="outline" onClick={() => router.push('/posts')}>
            Limpiar filtro
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredPosts.map(post => (
          <Card key={post.id} className="flex h-full flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription>
                Post #{post.id} - Usuario #{post.userId}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="line-clamp-3 text-muted-foreground">{post.body}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/posts/${post.id}`}>Ver detalles</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="py-10 text-center">
          <p className="text-muted-foreground">
            No se encontraron publicaciones
          </p>
        </div>
      )}
    </div>
  )
}
