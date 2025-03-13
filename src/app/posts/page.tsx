import { getPosts } from '@/lib/api'
import { PostsList } from './post-list'

export default async function PostsPage() {
  // Server Component fetching data
  const posts = await getPosts()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Publicaciones</h1>
        <p className="text-muted-foreground">
          Lista de publicaciones de JSONPlaceholder. Haz clic en una publicación
          para ver sus detalles y comentarios.
        </p>
      </div>

      <PostsList initialPosts={posts} />
    </div>
  )
}
