'use client'

import { useState } from 'react'

export default function LikeButton() {
  const [likes, setLikes] = useState(0)

  return (
    <div>
      <p>Likes: {likes}</p>

      <button
        onClick={() => setLikes(likes + 1)}
      >
        Like
      </button>
    </div>
  )
}