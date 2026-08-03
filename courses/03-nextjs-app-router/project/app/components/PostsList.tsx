'use client'
//  createApi, fetchBaseQuery, useQuery, useMutation
import { useGetPostsQuery } from '../store/apiSlice'

export default function PostsList() {
  const {
    data,
    isLoading,
    error,
  } = useGetPostsQuery()

  if (isLoading) {
    return <p>Loading posts...</p>
  }

  if (error) {
    return <p>Error loading posts</p>
  }

  return (
    <div>
      {data?.slice(0, 10).map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}