import AddPost from "@/components/AddPost";
import PostCard from "@/components/PostCard";
// import { getAllPosts } from "@/services/post";
import { Post } from "@/types/post";

export default async function Home() {
  // const posts: Post[] = await getAllPosts();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
    cache: "no-cache",
  });
  const posts: Post[] = await res.json();

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <AddPost />
        </div>
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
