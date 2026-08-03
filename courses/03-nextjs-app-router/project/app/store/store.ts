import { configureStore, createSlice } from '@reduxjs/toolkit'
// configureStore, useSelector, useDispatch,Provider
// createApi, fetchBaseQuery, useQuery, useMutation
import { apiSlice } from './apiSlice'

const counterSlice = createSlice({
  name: 'counter',

  initialState: {
    value: 0,
  },

  reducers: {
    increment: (state) => {
      state.value += 1
    },

    decrement: (state) => {
      state.value -= 1
    },
  },
})

export const {
  increment,
  decrement,
} = counterSlice.actions

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,

    [apiSlice.reducerPath]:
      apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware
    ),
})

export type RootState =
  ReturnType<typeof store.getState>

export type AppDispatch =
  typeof store.dispatch