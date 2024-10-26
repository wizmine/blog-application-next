import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";

const PostCard: React.FC<Post> = ({ id, title, description, image }) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
        alt={title}
        width={800}
        height={400}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-700">{description}</p>
        <Link href={`/posts/${id}`} className="text-blue-500 hover:underline">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
