import React, { useState } from 'react';
import usePostStore from './hook/use-post-store';

function App() {
  const { posts, addPost, updatePost, deletePost } = usePostStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      updatePost(editingPost.id, title, content);
      setEditingPost(null);
    } else {
      addPost(title, content);
    }
    setTitle('');
    setContent('');
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bulletin Board</h1>
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
                className="bg-yellow-500 text-black p-1 mr-2"
              >
                Edit
              </button>
              <button onClick={() => deletePost(post.id)} className="bg-red-500 text-black p-1">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
