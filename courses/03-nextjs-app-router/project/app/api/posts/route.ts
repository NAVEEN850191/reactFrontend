type Post = {
  id: number;
  title: string;
};

type CreatePostRequest = {
  title: string;
};

export async function GET() {
  const posts: Post[] = [
    {
      id: 1,
      title: "First Post",
    },
    {
      id: 2,
      title: "Second Post",
    },
  ];

  return Response.json(posts);
}

export async function POST(request: Request) {
  const body: CreatePostRequest = await request.json();

  return Response.json({
    message: "Post created",
    title: body.title,
  });
}