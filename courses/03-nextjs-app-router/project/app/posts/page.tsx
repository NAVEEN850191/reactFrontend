// asyncServerComponent
// asyncData
// fetch
// loadingTsx
// Suspense
//dynamicExport, forceStaticOrDynamic
// forceDynamic, cacheNoStore
// useServer, revalidatePath, revalidateTag
//  fetchCache

import { Suspense } from "react";
import AddPostForm from "../components/AddPostForm";

export const dynamic = "force-dynamic";

type Post = {
  id: number;
  title: string;
  body: string;
};

async function PostsList() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    {
      next: {
        revalidate: 60,
      },
    }
  );

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
}

export default async function PostsPage() {
  return (
    <main>
      <h1>Posts</h1>
      <PostsList />
    </main>
  );
}