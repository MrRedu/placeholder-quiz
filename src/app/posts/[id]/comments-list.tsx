'use client'

import { useState } from 'react'
import type { Comment } from '@/lib/api.model'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const commentSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido' }),
  email: z.string().email({ message: 'Email inválido' }),
  body: z
    .string()
    .min(5, { message: 'El comentario debe tener al menos 5 caracteres' }),
})

type CommentFormValues = z.infer<typeof commentSchema>

interface CommentsListProps {
  initialComments: Comment[]
  postId: number
}

export function CommentsList({ initialComments, postId }: CommentsListProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      name: '',
      email: '',
      body: '',
    },
  })

  const onSubmit = (data: CommentFormValues) => {
    // Create a new comment (this would usually go to an API)
    const newComment: Comment = {
      id: Date.now(), // Generate a temporary ID
      postId,
      name: data.name,
      email: data.email,
      body: data.body,
    }

    // Add the comment to the list (in a real app, we would update the cache)
    setComments(prev => [newComment, ...prev])
    form.reset()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Agregar un comentario</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="tu@email.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comentario</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Escribe tu comentario..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Publicar comentario</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {comments.map(comment => (
          <Card key={comment.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                {comment.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{comment.email}</p>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-sm">{comment.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">
            No hay comentarios todavía. ¡Sé el primero en comentar!
          </p>
        </div>
      )}
    </div>
  )
}
