'use server'
// useServer, revalidateTag
import { revalidatePath } from 'next/cache'

export async function addPost(formData: FormData) {
  const title = formData.get('title') as string

  // Simulate saving data
  const newPost = {
    title,
  }

  // Normally you'd save to a DB here

  revalidatePath('/posts')

  return {
    success: true,
  }
}