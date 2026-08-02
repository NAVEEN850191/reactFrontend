'use client'
//  useServer, revalidatePath, revalidateTag

import { useState } from 'react'
import { addPost } from '../actions'

export default function AddPostForm() {
  const [message, setMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    try {
      await addPost(formData)
      setMessage('Post added successfully!')
    } catch {
      setMessage('Failed to add post')
    }
  }

  return (
    <>
      <form action={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter post title"
          required
        />

        <button type="submit">
          Add Post
        </button>
      </form>

      {message && <p>{message}</p>}
    </>
  )
}