export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface PostStore {
  posts: Post[];
  addPost: (title: string, content: string) => void;
  updatePost: (id: number, title: string, content: string) => void;
  deletePost: (id: number) => void;
}
