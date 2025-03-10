import { create } from 'zustand';
import { PostStore } from '../type/post';
import { persist } from 'zustand/middleware';

const usePostStore = create<PostStore>()(
  persist(
    (set) => ({
      posts: [],

      addPost: (title, content) =>
        set((state) => ({
          posts: [...state.posts, { id: Date.now(), title, content }],
        })),

      updatePost: (id, title, content) =>
        set((state) => ({
          posts: state.posts.map((post) => (post.id === id ? { ...post, title, content } : post)),
        })),

      deletePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        })),
    }),
    {
      name: 'posts',
    }
  )
);

export default usePostStore;
