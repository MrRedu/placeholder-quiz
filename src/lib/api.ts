import type { Comment, Post, User } from './api.model'

const API_URL = 'https://jsonplaceholder.typicode.com'

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/users`)
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

export async function getUser(id: string): Promise<User> {
  const response = await fetch(`${API_URL}/users/${id}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch user with id ${id}`)
  }
  return response.json()
}

export async function getPosts(
  page = 1,
  limit = 10
): Promise<{ posts: Post[]; total: number }> {
  try {
    // Pequeño retraso para simular una carga real
    // await new Promise(resolve => setTimeout(resolve, 500))

    // JSONPlaceholder doesn't support pagination directly, so we'll simulate it
    const response = await fetch(`${API_URL}/posts`)
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }

    const allPosts = await response.json()
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedPosts = allPosts.slice(start, end)

    console.log(
      `Fetched page ${page}, showing posts ${start + 1}-${end} of ${allPosts.length}`
    )

    return {
      posts: paginatedPosts,
      total: allPosts.length,
    }
  } catch (error) {
    console.error('Error in getPosts:', error)
    // Return an empty object in case of error
    return {
      posts: [],
      total: 0,
    }
  }
}

export async function getPost(id: string): Promise<Post> {
  const response = await fetch(`${API_URL}/posts/${id}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch post with id ${id}`)
  }
  return response.json()
}

export async function getPostComments(postId: string): Promise<Comment[]> {
  const response = await fetch(`${API_URL}/posts/${postId}/comments`)
  if (!response.ok) {
    throw new Error(`Failed to fetch comments for post with id ${postId}`)
  }
  return response.json()
}

export async function getUserPosts(userId: number): Promise<Post[]> {
  const response = await fetch(`${API_URL}/users/${userId}/posts`)
  if (!response.ok) {
    throw new Error(`Failed to fetch posts for user with id ${userId}`)
  }
  return response.json()
}
