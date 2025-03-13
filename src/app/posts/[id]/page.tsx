import { getPost, getPostComments } from "@/lib/api"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { CommentsList } from "./comments-list"

export default async function PostDetailPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const [post, comments] = await Promise.all([getPost(params.id), getPostComments(params.id)])

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/posts">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <p className="text-sm text-muted-foreground">
              Publicación #{post.id} - Usuario #{post.userId}
            </p>
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <p className="whitespace-pre-line">{post.body}</p>
          </CardContent>
        </Card>

        <div className="pt-4">
          <Button asChild>
            <Link href={`/users/${post.userId}`}>Ver perfil del autor</Link>
          </Button>
        </div>

        <Separator className="my-4" />

        <div>
          <h2 className="text-xl font-bold mb-4">Comentarios</h2>
          <CommentsList initialComments={comments} postId={post.id} />
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}

