import 'react-toastify/dist/ReactToastify.css';
import React, { FunctionComponent, useState } from 'react';
import { Post } from './type/post';
import usePostStore from './hook/use-post-store';
import { ToastContainer, toast } from 'react-toastify';

const App: React.FC = () => {
  const { posts, addPost, updatePost, deletePost } = usePostStore();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      updatePost(editingPost.id, title, content);
      setEditingPost(null);
    } else {
      addPost(title, content);
      toast.success('Post added successfully!');
    }
    setTitle('');
    setContent('');
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bulletin Board</h1>

      <ToastContainer position="top-right" autoClose={3000} />

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-black p-2">
          {editingPost ? 'Update' : 'Post'}
        </button>
        {editingPost && (
          <button
            onClick={() => {
              setEditingPost(null);
              setTitle('');
              setContent('');
            }}
            className="bg-gray-500 text-black p-2 ml-2"
          >
            Cancel
          </button>
        )}
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="border p-2 mb-2 flex justify-between">
            <div>
              <h2 className="font-bold">{post.title}</h2>
              <p>{post.content}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(post)}
                className="px-3 py-1 mr-3 bg-yellow-500 text-black rounded-md shadow-md hover:bg-yellow-600 transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(post.id)}
                className="px-3 py-1 bg-red-500 text-black rounded-md shadow-md hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
