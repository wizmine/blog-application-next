export interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface CreatePost {
  title: string;
  description: string;
  image: string;
}

export interface UpdatePost {
  title?: string;
  description?: string;
  image?: string;
}