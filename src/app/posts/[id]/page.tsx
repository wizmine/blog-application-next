import { notFound } from "next/navigation";
import Image from "next/image";
import { Post } from "@/types/post";
import { getPostById } from "@/services/post";
import { NEXT_PUBLIC_API_URL } from "@/constants";
import Link from "next/link";
import DeleteButton from "@/ui/DeleteButton";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const post: Post = await getPostById(id);

  if (!post) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-12 flex justify-center">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <Image
          src={`${NEXT_PUBLIC_API_URL}${post.image}`}
          alt={post.title}
          layout="responsive"
          width={800}
          height={600}
          className="w-full h-auto object-contain mb-6 rounded-lg"
        />
        <div dangerouslySetInnerHTML={{ __html: post.description }} className="prose mx-auto"></div>
        <Link href="/" passHref>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
            Back home
          </button>
        </Link>
        <Link href={`/edit/${id}`} passHref>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300">
            Edit post
          </button>
        </Link>
        <DeleteButton id={id} />
      </div>
    </div>
  );
}
