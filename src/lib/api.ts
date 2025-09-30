import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type CreatePostRequest = Omit<Post, "id">;

// Для SSG, SSR, ISR
export const getPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>("/posts");
  return response.data.slice(0, 10); // Limit to first 10 posts
};

export const getPost = async (id: string): Promise<Post> => {
  const response = await apiClient.get<Post>(`/posts/${id}`);
  return response.data;
};

// Для CSR (поиск)
// export const searchPosts = async (query: string, allPosts: Post[]): Promise<Post[]> => {
//   return allPosts.filter((post) =>
//     post.title.toLowerCase().includes(query.toLowerCase())
//   );
// };

// POST-запрос для модального окна
export const createPost = async (newPost: CreatePostRequest): Promise<Post> => {
  const response = await apiClient.post<Post>("/posts", newPost);
  return response.data;
}
