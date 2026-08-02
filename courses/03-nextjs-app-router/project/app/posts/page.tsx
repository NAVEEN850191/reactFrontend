// asyncServerComponent
// asyncData
// fetch
// loadingTsx
// Suspense
//dynamicExport, forceStaticOrDynamic
// forceDynamic, cacheNoStore
// useServer, revalidatePath, revalidateTag

import { Suspense } from "react";
import AddPostForm from "../components/AddPostForm";

export const dynamic = "force-dynamic";

type Post = {
  id: number;
  title: string;
  body: string;
};

async function PostsList() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts: Post[] = await response.json();

    return (
      <ul>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    );
  } catch {
    return <p>Unable to load posts.</p>;
  }
}

export default function PostsPage() {
  return (
    <main>
      <h1>Posts</h1>

      <AddPostForm />

      <Suspense fallback={<p>Loading posts...</p>}>
        <PostsList />
      </Suspense>
    </main>
  );
}