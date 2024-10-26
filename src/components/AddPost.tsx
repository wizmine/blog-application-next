"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../services/axios";
import { createPost } from "@/services/post";
import Image from "next/image";

const AddPost = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const inputFileRef = useRef<HTMLInputElement | null>(null);

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
      alert("Error loading file!");
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

      await createPost(fields);
      setTitle("");
      setDescription("");
      setImageUrl("");
      router.push("/");
    } catch (error) {
      console.warn(error);
      alert("Error while creating post!");
    }
  };

  return (
    <div className="border rounded-lg p-6 shadow-md">
      <form onSubmit={onSubmit}>
        <label className="block mb-2 font-bold">Create a Post</label>
        <input
          type="text"
          placeholder="title"
          className="border border-gray-300 p-2 w-full mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="description"
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
              src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
              alt={title}
              width={800}
              height={400}
              className="w-full h-48 object-cover"
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
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default AddPost;
