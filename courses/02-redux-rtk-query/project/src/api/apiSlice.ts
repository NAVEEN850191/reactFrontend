import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { mockApi } from './mockServer'

interface User {
  id: number
  name: string
  email: string
  username: string
}

export const apiSlice = createApi({
  reducerPath: 'api', 
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      queryFn: async () => {
        const users = await mockApi.getUsers()
        return { data: users }
      },
    }),
  }),
})

export const { useGetUsersQuery } = apiSlice