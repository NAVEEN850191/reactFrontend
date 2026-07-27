import { Suspense } from "react";
export const dynamic = "force-dynamic";
// asyncServerComponent
// asyncData
// fetch
// loadingTsx
// Suspense
//dynamicExport, forceStaticOrDynamic

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
      <main>
        <h1>Posts</h1>

        <ul>
          {posts.slice(0, 10).map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </main>
    );
  } catch {
    return (
      <main>
        <h1>Posts</h1>
        <p>Unable to load posts.</p>
      </main>
    );
  }
}

export default function PostsPage() {
  return (
    <main>
      <h1>Posts</h1>

      <Suspense fallback={<p>Loading posts...</p>}>
        <PostsList />
      </Suspense>
    </main>
  );
}