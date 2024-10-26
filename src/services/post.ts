import { CreatePost, UpdatePost } from "@/types/post";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/post`;

export const getAllPosts = async () => {
  const res = await fetch(API_URL, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Error when receiving posts");
  }
  return res.json();
};

export const getPostById = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Error when receiving post with ID ${id}`);
  }
  return res.json();
};

export const createPost = async (postData: CreatePost) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Create post error");
  }
  return res.json();
};

export const updatePost = async (id: string, postData: UpdatePost) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Update error with ID ${id}`);
  }
  return res.json();
};

export const deletePost = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Delete error with ID ${id}`);
  }
  return res.json();
};
