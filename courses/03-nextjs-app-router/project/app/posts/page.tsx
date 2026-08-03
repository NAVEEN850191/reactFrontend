// asyncServerComponent
// asyncData
// fetch
// loadingTsx
// Suspense
//dynamicExport, forceStaticOrDynamic
// forceDynamic, cacheNoStore
// useServer, revalidatePath, revalidateTag
//  fetchCache
// metadata, generateMetadata
// pagination
import Link from 'next/link'
import { Suspense } from "react";
import AddPostForm from "../components/AddPostForm";

type Post = {
  id: number
  title: string
  body: string
}

type PostsPageProps = {
  searchParams: {
    q?: string
    page?: string
  }
}

export default async function PostsPage({
  searchParams,
}: PostsPageProps) {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts',
    {
      next: {
        revalidate: 60,
      },
    }
  )

  const posts: Post[] = await response.json()

  const query = searchParams.q?.toLowerCase() ?? ''

  const page = Number(searchParams.page) || 1

  const postsPerPage = 10

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query)
  )

  const startIndex = (page - 1) * postsPerPage

  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  )

  return (
    <main>
      <h1>Posts</h1>

      <ul>
        {paginatedPosts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

      <Link href={`/posts?q=${query}&page=${page + 1}`}>
        Next Page
      </Link>
    </main>
  )
}