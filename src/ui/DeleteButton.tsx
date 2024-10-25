"use client";

import React from "react";
import { deletePost } from "@/services/post";
import { useRouter } from "next/navigation";

const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();

  const onClickRemove = async () => {
    if (window.confirm("Are you sure you want to delete article?")) {
      await deletePost(id);
      router.push("/");
    }
  };

  return (
    <button
      onClick={onClickRemove}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
    >
      Delete post
    </button>
  );
};

export default DeleteButton;
