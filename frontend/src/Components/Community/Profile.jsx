import React, { useState } from "react";
import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';
import { FaClipboard, FaHeart, FaPen } from 'react-icons/fa';

const Profile = () => {
  const [activeTab, setActiveTab] = useState("gallery");
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Blog Post 1",
      description: "Description of Blog Post 1",
      image:
        "https://storage.googleapis.com/hipstamp/p/94e298ad01e6ebf4ee5de09b446a6026-800.jpg",
      likes: 0,
    },
    {
      id: 2,
      title: "Blog Post 2",
      description: "Description of Blog Post 2",
      image:
        "https://storage.googleapis.com/hipstamp/p/94e298ad01e6ebf4ee5de09b446a6026-800.jpg",
      likes: 0,
    },
    {
      id: 3,
      title: "Blog Post 3",
      description: "Description of Blog Post 3",
      image:
        "https://storage.googleapis.com/hipstamp/p/94e298ad01e6ebf4ee5de09b446a6026-800.jpg",
      likes: 0,
    },
    {
      id: 4,
      title: "Blog Post 4",
      description: "Description of Blog Post 3",
      image:
        "https://storage.googleapis.com/hipstamp/p/94e298ad01e6ebf4ee5de09b446a6026-800.jpg",
      likes: 0,
    },
    {
      id: 5,
      title: "Blog Post 5",
      description: "Description of Blog Post 3",
      image:
        "https://storage.googleapis.com/hipstamp/p/94e298ad01e6ebf4ee5de09b446a6026-800.jpg",
      likes: 0,
    },
    {
      id: 6,
      title: "Blog Post 6",
      description: "Description of Blog Post 3",
      image:
        "https://storage.googleapis.com/hipstamp/p/94e298ad01e6ebf4ee5de09b446a6026-800.jpg",
      likes: 0,
    },
  ]);

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-light dark:text-text-dark">
      <header className="container mx-auto py-4 flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-xl mx-auto">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
            <img
              src="https://i.ebayimg.com/images/g/fzwAAOSwQOdf2Z-y/s-l400.jpg" // Replace with your image URL
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-xl text-primary-dark font-bold">Darshil Kothiya</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Passionate stamp collector exploring postal history
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            London, UK | Joined March 2022
          </p>
        </div>
        <div className="flex space-x-8 text-primary-dark dark:text-gray-400 mt-4">
          <div className="flex items-center space-x-2">
            <FaClipboard />
            <span>120 Stamps</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaHeart />
            <span>456 Likes</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaPen />
            <span>38 Posts</span>
          </div>


        </div>



      </header>

      <nav className="container mx-auto mt-4 border-b border-border-light dark:border-border-dark">
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => setActiveTab("gallery")}
            className={`py-2 border-b-2 ${activeTab === "gallery"
                ? "border-accent-light dark:border-accent-dark text-accent-light dark:text-accent-dark"
                : "border-transparent text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark"
              }`}
          >
            Gallery
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`py-2 border-b-2 ${activeTab === "posts"
                ? "border-accent-light dark:border-accent-dark text-accent-light dark:text-accent-dark"
                : "border-transparent text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark"
              }`}
          >
            Posts
          </button>
        </div>
      </nav>

      <main className="container mx-auto mt-8 flex justify-center items-center">
  {activeTab === "gallery" && (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      {[1, 2, 3, 4, 5, 6].map((galleryItem) => (
        <div
          key={galleryItem}
          className="bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark shadow-md rounded-md p-4"
        >
          <div className="w-full h-48 mb-4">
            <img
              src="https://media.istockphoto.com/id/185104480/photo/indian-stamp.jpg?s=170667a&w=0&k=20&c=UNHgAQrJ-K4R-kxPf73SaDkTu4FOkYMCfAanJiFRPQY="
              alt={`Gallery Item ${galleryItem}`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <h2 className="text-lg font-semibold mb-2">
            Gallery Item {galleryItem}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Description for Gallery Item {galleryItem}.
          </p>
        </div>
      ))}
    </div>
  )}

  {activeTab === "posts" && (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark shadow-md rounded-md p-4"
        >
          <div className="w-full h-48 mb-4">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {post.description}
          </p>

          <div className="flex justify-between items-center text-sm">
            <button
              className="flex items-center space-x-2 text-accent-light dark:text-accent-dark hover:bg-primary-dark dark:hover:bg-primry-light hover:text-primary-light dark:hover-text-primary-dark hover:scale-105 transform transition-all duration-300 p-2 rounded-md"
              onClick={() => handleLike(post.id)}
            >
              <FaThumbsUp />
              <span>Like ({post.likes})</span>
            </button>
            <button className="flex items-center space-x-2 text-accent-light dark:text-accent-dark hover:bg-primary-dark dark:hover:bg-primry-light hover:text-primary-light dark:hover-text-primary-dark  hover:scale-105 transform transition-all duration-300 p-2 rounded-md">
              <FaComment />
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-2 text-accent-light dark:text-accent-dark hover:bg-primary-dark dark:hover:bg-primry-light hover:text-primary-light dark:hover-text-primary-dark  hover:scale-105 transform transition-all duration-300 p-2 rounded-md">
              <FaShare />
              <span>Share</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</main>

    </div>
  );
};

export default Profile;
