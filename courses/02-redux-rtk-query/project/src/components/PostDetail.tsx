import { useGetPostByIdQuery } from '../api/apiSlice'

export default function PostDetail() {
  const postId = 1
  const {data,isLoading,isError,} = useGetPostByIdQuery(postId, {skip: !postId,})

  if (isLoading) {
    return (
      <div data-testid="post-detail-loading">
        Loading post...
      </div>
    )
  }

  if (isError) {
    return (
      <div data-testid="post-detail-error">
        Error loading post
      </div>
    )
  }

  return (
    <div data-testid="post-detail">
      <h2>{data?.title}</h2>
      <p>{data?.body}</p>
    </div>
  )
}