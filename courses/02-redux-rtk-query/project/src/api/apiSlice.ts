import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { mockApi,Post } from './mockServer'

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

      getPosts: builder.query<Post[], void>({
        queryFn: async () => {
          const posts = await mockApi.getPosts()

          return {
            data: posts,
          }
        },

        providesTags: [
          {
            type: 'Post',
            id: 'LIST',
          },
        ],
      }),

      getPostById: builder.query<Post, number>({
          queryFn: async (id) => {
            const posts = await mockApi.getPosts()

            const post = posts.find((post) => post.id === id)

            if (!post) {
              return {
                error: {
                  status: 404,
                  data: 'Post not found',
                },
              }
            }

            return {
              data: post,
            }
          },

          providesTags:(_result, _error, id) => [
            {
              type: 'Post',
              id,
            },
          ],
      }),

      addPost: builder.mutation<Post, Omit<Post, 'id'>>({
        queryFn: async (post) => {
          const newPost = await mockApi.createPost(post)

          return {
            data: newPost,
          }
        },

        async onQueryStarted(arg,{dispatch,queryFulfilled}){
          const patchResult=dispatch(apiSlice.util.updateQueryData(
            'getPosts',undefined,(draft)=>{
              draft.push({
                ...arg,id:Date.now(),
              })
            }
          ))

          try{
            await queryFulfilled
          }
          catch{
            patchResult.undo()
          }
        },

        invalidatesTags: [
          {
            type: 'Post',
            id: 'LIST',
          },
        ],
      }),

    }),
  })

export const {useGetUsersQuery,useGetPostsQuery,useGetPostByIdQuery,useAddPostMutation,} = apiSlice
