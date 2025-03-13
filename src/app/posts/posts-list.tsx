'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { getPosts } from '@/lib/api'
import type { Post } from '@/lib/api.model'

interface PostsListProps {
  initialPosts: Post[]
  totalPosts: number
}

type SortDirection = 'asc' | 'desc'

export function PostsList({ initialPosts, totalPosts }: PostsListProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const pageParameter = searchParams.get('page')
  const currentPage = pageParameter ? Number.parseInt(pageParameter) : 1

  const userIdParameter = searchParams.get('userId')
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
    staleTime: 60_000, // 1 minuto
  })

  const posts = data?.posts || []
  const total = data?.total || 0

  const totalPages = Math.ceil(total / postsPerPage)

  // Filter and sort posts
  const filteredAndSortedPosts = [...posts]
    .filter(post => {
      if (userIdParameter && post.userId !== Number.parseInt(userIdParameter)) {
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

    if (userIdParameter) {
      params.set('userId', userIdParameter)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  useEffect(() => {
    if (searchTerm || sortDirection) {
      handlePageChange(1)
    }
  }, [searchTerm, userIdParameter])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
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

      {userIdParameter && (
        <div className="flex items-center justify-between rounded-lg bg-muted p-4">
          <p>Filtrando publicaciones del usuario ID: {userIdParameter}</p>
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
              {Array.from({ length: Math.min(5, totalPages) }).map(
                (_, index) => {
                  let pageNumber: number

                  // Lógica para mostrar las páginas correctas alrededor de la página actual
                  if (totalPages <= 5) {
                    pageNumber = index + 1
                  } else if (currentPage <= 3) {
                    pageNumber = index + 1
                    if (index === 4) {
                      return (
                        <div key="ellipsis1" className="px-3 py-2">
                          ...
                        </div>
                      )
                    }
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + index
                    if (index === 0) {
                      return (
                        <div key="ellipsis2" className="px-3 py-2">
                          ...
                        </div>
                      )
                    }
                  } else {
                    if (index === 0) {
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
                    if (index === 1) {
                      return (
                        <div key="ellipsis3" className="px-3 py-2">
                          ...
                        </div>
                      )
                    }
                    if (index === 3) {
                      return (
                        <div key="ellipsis4" className="px-3 py-2">
                          ...
                        </div>
                      )
                    }
                    if (index === 4) {
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
                    pageNumber = currentPage + index - 2
                  }

                  return (
                    <Button
                      key={pageNumber}
                      variant={
                        pageNumber === currentPage ? 'default' : 'outline'
                      }
                      onClick={() => handlePageChange(pageNumber)}
                      className="h-9 w-9 p-0"
                      disabled={isLoading || isFetching}
                    >
                      {pageNumber}
                    </Button>
                  )
                }
              )}
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
