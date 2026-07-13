
import {useAppSelector, useAppDispatch} from '../store/hooks'
import {useGetPostsQuery} from '../api/apiSlice'
import {setSortBy} from '../store/slices/filtersSlice'


export default function PostsWithFilters() {

  const {data:posts=[],isLoading,error} = useGetPostsQuery()

  const {sortBy}=useAppSelector((state)=>state.filters)

  const dispatch=useAppDispatch()

  const sortedPosts=[...posts].sort((a,b)=>{
      switch(sortBy){
        case 'newest':
          return b.id - a.id
        case 'oldest':
          return a.id - b.id
        default:
          return 0  
      }
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading posts</div>
  }


  return(
   <>
      <div data-testid="filter-controls">
        <button
          type="button"
          onClick={() => dispatch(setSortBy('newest'))}
        >
          Newest
        </button>

        <button
          type="button"
          onClick={() => dispatch(setSortBy('oldest'))}
        >
          Oldest
        </button>
      </div>

      <div data-testid="posts-with-filters">
        {sortedPosts.map((post) => (
          <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </article>
        ))}
      </div>
    </>
  )
}
