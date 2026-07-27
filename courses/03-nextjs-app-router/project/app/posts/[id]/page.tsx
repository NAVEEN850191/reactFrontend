// dynamicRoute
// params
// dynamicSegment

type Post = {
  id: number;
  title: string;
  body: string;
};

type PostPageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ];
}

export default async function PostPage({
  params,
}: PostPageProps) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return <p>Post not found.</p>;
  }

  const post: Post = await response.json();

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Post ID: {params.id}</p>
    </main>
  );
}