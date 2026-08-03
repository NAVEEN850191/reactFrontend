// dynamicRoute
// params
// dynamicSegment
//  errorTsx
//metadata, generateMetadata
// useClient
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LikeButton from '../../components/LikeButton'

type Post = {
  id: number
  title: string
  body: string
}

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  return {
    title: `Post ${params.id}`,
    description: `Viewing post ${params.id}`,
  }
}

export default async function PostPage({
  params,
}: Props) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    {
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    notFound()
  }

  const post: Post = await response.json()

  if (!post?.id) {
    notFound()
  }

  return (
    <main>
      <h1>{post.title}</h1>

      <p>{post.body}</p>

      <LikeButton />
    </main>
  )
}