import { getPosts } from '@/lib/api'
import { PostsList } from './posts-list'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

interface PostsPageProps {
  searchParams: { page?: string }
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const currentPage = searchParams.page ? Number.parseInt(searchParams.page) : 1

  try {
    const { posts, total } = await getPosts(currentPage, 10)

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Publicaciones</h1>
          <p className="text-muted-foreground">
            Lista de publicaciones de JSONPlaceholder. Haz clic en una
            publicación para ver sus detalles y comentarios.
          </p>
        </div>

        <Suspense fallback={<LoadingSkeleton />}>
          <PostsList initialPosts={posts} totalPosts={total} />
        </Suspense>
      </div>
    )
  } catch (error) {
    console.error('Error fetching posts:', error)
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Publicaciones</h1>
          <p className="text-muted-foreground">
            Lista de publicaciones de JSONPlaceholder. Haz clic en una
            publicación para ver sus detalles y comentarios.
          </p>
        </div>

        <PostsList initialPosts={[]} totalPosts={0} />
      </div>
    )
  }
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-full md:w-48" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="h-full p-6">
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="mb-4 h-4 w-1/2" />
            <Skeleton className="mb-4 h-20 w-full" />
            <Skeleton className="h-9 w-28" />
          </Card>
        ))}
      </div>
    </div>
  )
}
