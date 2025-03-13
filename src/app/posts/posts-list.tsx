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
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '@/lib/api'
import { Skeleton } from '@/components/ui/skeleton'

interface PostsListProps {
  initialPosts: Post[]
  totalPosts: number
}

type SortDirection = 'asc' | 'desc'

export function PostsList({ initialPosts, totalPosts }: PostsListProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const pageParam = searchParams.get('page')
  const currentPage = pageParam ? Number.parseInt(pageParam) : 1

  const userIdParam = searchParams.get('userId')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const postsPerPage = 10

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['posts', currentPage, postsPerPage],
    queryFn: () => getPosts(currentPage, postsPerPage),
    initialData:
      currentPage === 1
        ? { posts: initialPosts, total: totalPosts }
        : undefined,
    staleTime: 60000, // 1 minuto
  })

  const posts = data?.posts || []
  const total = data?.total || 0

  const totalPages = Math.ceil(total / postsPerPage)

  // Filter and sort posts
  const filteredAndSortedPosts = [...posts]
    .filter(post => {
      if (userIdParam && post.userId !== Number.parseInt(userIdParam)) {
        return false
      }

      if (
        searchTerm &&
        !post.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      const comparison = a.title.localeCompare(b.title)
      return sortDirection === 'asc' ? comparison : -comparison
    })

  // Función para cambiar de página
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return

    // Crear un nuevo objeto URLSearchParams
    const params = new URLSearchParams(searchParams.toString())

    params.set('page', page.toString())

    if (userIdParam) {
      params.set('userId', userIdParam)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  useEffect(() => {
    if (searchTerm || sortDirection) {
      handlePageChange(1)
    }
  }, [searchTerm, userIdParam])

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
          <Button
            variant="outline"
            onClick={() => {
              const params = new URLSearchParams()
              params.set('page', '1')
              router.push(`${pathname}?${params.toString()}`)
            }}
          >
            Limpiar filtro
          </Button>
        </div>
      )}

      {/* Indicador de página actual */}
      <div className="text-center text-sm text-muted-foreground">
        Mostrando página {currentPage} de {totalPages}
      </div>

      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="h-full">
              <CardHeader className="pb-2">
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-28" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredAndSortedPosts.length > 0 ? (
            filteredAndSortedPosts.map(post => (
              <Card key={post.id} className="flex h-full flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription>
                    Post #{post.id} - Usuario #{post.userId}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="line-clamp-3 text-muted-foreground">
                    {post.body}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href={`/posts/${post.id}`}>Ver detalles</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-2 py-10 text-center">
              <p className="text-muted-foreground">
                No se encontraron publicaciones
              </p>
            </div>
          )}
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading || isFetching}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNumber: number

                // Lógica para mostrar las páginas correctas alrededor de la página actual
                if (totalPages <= 5) {
                  pageNumber = i + 1
                } else if (currentPage <= 3) {
                  pageNumber = i + 1
                  if (i === 4) {
                    return (
                      <div key="ellipsis1" className="px-3 py-2">
                        ...
                      </div>
                    )
                  }
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i
                  if (i === 0) {
                    return (
                      <div key="ellipsis2" className="px-3 py-2">
                        ...
                      </div>
                    )
                  }
                } else {
                  if (i === 0) {
                    return (
                      <Button
                        key="first"
                        variant={1 === currentPage ? 'default' : 'outline'}
                        onClick={() => handlePageChange(1)}
                        className="h-9 w-9 p-0"
                        disabled={isLoading || isFetching}
                      >
                        1
                      </Button>
                    )
                  }
                  if (i === 1) {
                    return (
                      <div key="ellipsis3" className="px-3 py-2">
                        ...
                      </div>
                    )
                  }
                  if (i === 3) {
                    return (
                      <div key="ellipsis4" className="px-3 py-2">
                        ...
                      </div>
                    )
                  }
                  if (i === 4) {
                    return (
                      <Button
                        key="last"
                        variant={
                          totalPages === currentPage ? 'default' : 'outline'
                        }
                        onClick={() => handlePageChange(totalPages)}
                        className="h-9 w-9 p-0"
                        disabled={isLoading || isFetching}
                      >
                        {totalPages}
                      </Button>
                    )
                  }
                  pageNumber = currentPage + i - 2
                }

                return (
                  <Button
                    key={pageNumber}
                    variant={pageNumber === currentPage ? 'default' : 'outline'}
                    onClick={() => handlePageChange(pageNumber)}
                    className="h-9 w-9 p-0"
                    disabled={isLoading || isFetching}
                  >
                    {pageNumber}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading || isFetching}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
