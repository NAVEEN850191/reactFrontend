import { useState } from 'react'
import { useAddPostMutation } from '../api/apiSlice'

export default function AddPostForm() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const [addPost, { isLoading, isSuccess }] = useAddPostMutation()

  const handleSubmit = async ( e: React.FormEvent<HTMLFormElement> ) => { 
    e.preventDefault()

    await addPost({
      userId: 1,
      title,
      body,
    })

    setTitle('')
    setBody('')
  }

  return (
    <form
      data-testid="add-post-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) =>
          setBody(e.target.value)
        }
      />

      <button
        type="submit"
        data-testid="add-post-submit"
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Add Post'}
      </button>

      {isSuccess && (
        <p>Post added successfully!</p>
      )}
    </form>
  )
}