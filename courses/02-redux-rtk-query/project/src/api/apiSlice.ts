import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { mockApi } from './mockServer'

interface User {
  id: number
  name: string
  email: string
  username: string
  phone:string
}

export const apiSlice = createApi({
  reducerPath: 'api', 

  baseQuery: fakeBaseQuery(),

  tagTypes: ['User', 'Post'],

  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      queryFn: async () => {
        const users = await mockApi.getUsers()
        return { data: users }
      },

      providesTags: (result) =>result ? [
              ...result.map(({ id }) => ({
                type: 'User' as const,
                id,
              })),
              {
                type: 'User',
                id: 'LIST',
              },
            ]
          : [
              {
                type: 'User',
                id: 'LIST',
              },
            ],
    }),


    addUser: builder.mutation<User, Omit<User,'id'>>({
      queryFn: async (user) => {
        const newUser = await mockApi.createUser(user)

        return {
          data: newUser,
        }
      },

      invalidatesTags: [
        {
          type: 'User',
          id: 'LIST',
        },
      ],
    }),

    }),
  })

export const { useGetUsersQuery } = apiSlice