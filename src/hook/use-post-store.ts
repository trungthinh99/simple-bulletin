import { create } from 'zustand';

const usePostStore = create((set) => ({
  posts: JSON.parse(localStorage.getItem('posts') ?? '[]') || [],

  addPost: (title, content) =>
    set((state) => {
      const newPost = { id: Date.now(), title, content };
      const updatedPosts = [...state.posts, newPost];
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      return { posts: updatedPosts };
    }),

  updatePost: (id, title, content) =>
    set((state) => {
      const updatedPosts = state.posts.map((post) =>
        post.id === id ? { ...post, title, content } : post
      );
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      return { posts: updatedPosts };
    }),

  deletePost: (id) =>
    set((state) => {
      const updatedPosts = state.posts.filter((post) => post.id !== id);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      return { posts: updatedPosts };
    }),
}));

export default usePostStore;
