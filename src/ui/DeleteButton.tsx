"use client";

import React from "react";
import { deletePost } from "@/services/post";
import { useRouter } from "next/navigation";

const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();

  const onClickRemove = async () => {
    if (window.confirm("Are you sure you want to delete post?")) {
      await deletePost(id);
      router.push("/");
    }
  };

  console.log("DeleteButton rendered with id: ", id);

  return (
    <button
      className="px-4 py-2"
      onClick={onClickRemove}
    >
      Delete post
    </button>
  );
};

export default DeleteButton;
