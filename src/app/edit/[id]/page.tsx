"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/services/axios";
import { getPostById, updatePost } from "@/services/post";
import { NEXT_PUBLIC_API_URL } from "@/constants";
import Image from "next/image";

export default function EditPost() {
  const { id }: { id: string } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        setTitle(post.title);
        setDescription(post.description);
        setImageUrl(post.image);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      const file = event.target.files?.[0];
      if (file) {
        formData.append("file", file);
        const { data } = await axios.post("/post/upload", formData);
        setImageUrl(data.filePath);
      }
    } catch (error) {
      console.warn(error);
      alert("Error uploading file!");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const fields = {
        title,
        description,
        image: imageUrl,
      };
      await updatePost(id, fields);
      router.push("/");
    } catch (error) {
      console.warn(error);
      alert("Error updating post!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="border rounded-lg p-6 shadow-md max-w-lg w-full">
        <form onSubmit={onSubmit}>
          <label className="block mb-2 font-bold text-center">Edit Post</label>
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-300 p-2 w-full mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="border border-gray-300 p-2 w-full mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          {imageUrl && (
            <div className="mb-4">
              <button type="button" onClick={onClickRemoveImage} className="text-red-600">
                Remove Image
              </button>
              <Image
                src={`${NEXT_PUBLIC_API_URL}${imageUrl}`}
                alt={title}
                width={800}
                height={400}
                className="w-full h-auto max-h-40 object-contain"
              />
            </div>
          )}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => {
                inputFileRef.current?.click();
              }}
              className="text-blue-500"
            >
              Upload Image
            </button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
}
