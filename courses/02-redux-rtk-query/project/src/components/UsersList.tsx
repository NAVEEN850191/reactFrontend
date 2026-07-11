/** Stub: Complete Challenge 07 (Queries) per README. */
import {useGetUsersQuery} from '../api/apiSlice'
//imported  useQueryHook fromapiSlice

export default function UsersList() {

  const {data,isLoading,isError,error}=useGetUsersQuery()
  if (isLoading) {
    return (
      <div data-testid="users-loading">
        Loading...
      </div>
    )
  }

  if (isError || error) {
    return (
      <div data-testid="users-error">
        Error loading users
      </div>
    )
  }



  return (
  
    <div data-testid="users-list">
      {data?.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.username}</p>
        </div>
      ))}
    </div>
  )
}
