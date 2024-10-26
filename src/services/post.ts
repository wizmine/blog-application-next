import axios from "./axios";
import { CreatePost, UpdatePost } from "@/types/post";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/post`;

export const getAllPosts = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const getPostById = async (id: string) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const createPost = async (postData: CreatePost) => {
  const { data } = await axios.post(API_URL, postData);
  return data;
};

export const updatePost = async (id: string, postData: UpdatePost) => {
  const { data } = await axios.patch(`${API_URL}/${id}`, postData);
  return data;
};

export const deletePost = async (id: string) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
