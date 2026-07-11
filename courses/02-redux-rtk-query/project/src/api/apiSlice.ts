import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { mockApi } from './mockServer'

export const apiSlice = createApi({
  reducerPath: 'api', 
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUsers: builder.query({
      queryFn: async () => {
        const users = await mockApi.getUsers()
        return { data: users }
      },
    }),
  }),
})

export const { useGetUsersQuery } = apiSlice