import React, { useState } from "react";
import AddCollection from "./AddCollection";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaCommentDots, FaShareAlt } from "react-icons/fa";
import { FaHome, FaFolder, FaPaperPlane } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa'; 


const Community = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [collections, setCollections] = useState([
    {
      id: 1,
      username: "Darshil", 
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg", 
      name: "Victorian Era Stamps",
      description:
        "A curated collection of rare Victorian stamps from the British Empire.",
      image:
        "https://c8.alamy.com/comp/2HMNFKW/taj-mahal-on-postage-stamp-of-dominica-2HMNFKW.jpg",
      comments: [],
      likes: 0,
      showCommentInputs: 0,
      newComment: "",
    },
    {
      id: 2,
      username: "Darshil", 
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg", 
      name: "Art Deco Collection",
      description:
        "A vibrant collection of Art Deco-inspired stamps from the early 20th century.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Y4gS5lX84osJsTrTUV9HSaEvVSBDsOCfHMQJmRfU9Jet9IeJ4jyk5jM6mgu1IyG7fnM&usqp=CAU",
      comments: [],
      likes: 0,
      showCommentInputs: 0,
      newComment: "",
    },
    {
      id: 3,
      username: "Darshil",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg", 
      name: "Classic Cars Collection",
      description:
        "A tribute to classic cars through a series of commemorative stamps.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQumnJtByR9x33UZfLKTnH_okbT5s1gVuzQqQ&s",
      comments: [],
      likes: 0,
      showCommentInputs: 0,
      newComment: "",
    },
    {
      id: 4,
      username: "Darshil", 
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg", 
      name: "Wildlife Stamps",
      description:
        "An inspiring collection showcasing wildlife and endangered species worldwide.",
      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhFX2Ww1vklQ7PLdI3mf_fruQPDYy1lBUIEgG1qSuAqybS7odR9QJ6yelJlP5NoSBkXHHudTWTNW6XZ5CTJpPkjuotWfAg00fGkXOi9sBybREZzUkkUaPf7p8vGb9k7DV4qZMTZawDtP7k/s1140/04-10-1999-2+ASIATIC+LION.jpg",
      comments: [],
      likes: 0,
      showCommentInputs: 0,
      newComment: "",
    },
    {
      id: 5,
      username: "Darshil",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg", 
      name: "Space Exploration Series",
      description:
        "Celebrate mankind's journey to space with this stellar collection of stamps.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/US_Space_Walk_1967_Issue-5c.jpg/386px-US_Space_Walk_1967_Issue-5c.jpg",
      comments: [],
      likes: 0,
      showCommentInputs: 0,
      newComment: "",
    },
    {
      id: 6,
      username: "Darshil",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg", 
      name: "Festivals Around the World",
      description:
        "A joyous collection featuring stamps from various global festivals and cultures.",
      image:
        "https://cdn.collectorbazar.com/products/india-stamp-1278-tribal-dances-hozagiri-reangs-of-tripura-1991-mnh-121659-1.jpg",
      comments: [],
      likes: 0,
      showCommentInputs: 0,
      newComment: "",
    },
    {
      id: 7,
      username: "Darshil", 
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg", 
      name: "Sports Legends Stamps",
      description:
        "Iconic stamps honoring legendary sports personalities across the world.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJA0AL-1LiIRq5l6C41Bu_MnWMrhX53QD7WJPLOMoBCxJWSmy2NfASutOGLBshMCDDRZ0&usqp=CAU",
      comments: [],
      likes: 0,
      showCommentInputs: 0,
      newComment: "",
    },
  ]);

  const handleAddClick = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  const handleAddCollection = (data) => {
    setCollections([
      ...collections,
      {
        id: collections.length + 1,
        name: data.collectionName,
        description: data.content,
        image: data.image,
        comments: [],
        likes: 0,
        showCommentInputs: 0,
        newComment: "",
      },
    ]);
    setShowModal(false);
  };

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleCommentInput = (id) => {
    const updatedCollections = collections.map((item) =>
      item.id === id ? { ...item, showCommentInputs: !item.showCommentInputs } : item
    );
    setCollections(updatedCollections);
  };

  const handleCommentChange = (e, id) => {
    const updatedCollections = collections.map((item) =>
      item.id === id
        ? { ...item, newComment: e.target.value }
        : item
    );
    setCollections(updatedCollections);
  };
  const handleAddComment = (id) => {
    const updatedCollections = collections.map((item) =>
      item.id === id
        ? {
            ...item,
            comments: [...item.comments, item.newComment], 
            newComment: '', 
            showCommentInputs: false, 
          }
        : item
    );
    setCollections(updatedCollections);
  };

    // Delete a comment
    const handleDeleteComment = (collectionId, commentIndex) => {
      const updatedCollections = collections.map((item) =>
        item.id === collectionId
          ? {
              ...item,
              comments: item.comments.filter((_, index) => index !== commentIndex), // Remove the comment by index
            }
          : item
      );
      setCollections(updatedCollections);
    };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-text-light dark:text-text-dark">
      <header className="container mx-auto py-4 flex justify-between items-center">
        <Link to="/community/profile">
        <h1
  className="text-2xl font-bold text-primary-dark cursor-pointer transition-all duration-300 tracking-wide"
  onClick={() => window.location.href = '/community/profile'}
>
  Darshil's Stamp Vault
</h1>

        </Link>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search collections..."
            className="px-4 py-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select className="px-4 py-2 border rounded-md">
            <option>Sort by Stamps</option>
            <option>Sort by Posts</option>
          </select>
          <button
            onClick={handleAddClick}
            className="bg-accent-light dark:bg-accent-dark text-white px-4 py-2 rounded-md hover:opacity-90"
          >
            + Add Collection
          </button>
        </div>
      </header>

      <div className="container mx-auto mt-8 flex">
    
      <aside className="w-1/4 bg-white text-white p-4">
  <div className="flex flex-col space-y-4">
    <ul className="space-y-1">
      <li>
        <a
          href="/community"
          className="text-black hover:text-primary-dark flex items-center space-x-2"
        >
          <FaHome /> 
          <span>Home</span>
        </a>
      </li>
      <li>
        <a
          href="/community/profile"
          className="text-black hover:text-primary-dark flex items-center space-x-2"
        >
          <FaFolder />
          <span>Collection</span>
        </a>
      </li>
      <li>
        <a
          href="/community/profile"
          className="text-black hover:text-primary-dark flex items-center space-x-2"
        >
          <FaPaperPlane /> 
          <span>Posts</span>
        </a>
      </li>
    </ul>
  </div>
</aside>

<main className="w-1/2 pr-4 ml-auto mt-8 mb-8">
  {filteredCollections.length > 0 ? (
    <div className="grid grid-cols-1 gap-6">
      {filteredCollections.map((collection) => (
        <div
          key={collection.id}
          className="bg-white dark:bg-gray-800 border rounded-lg overflow-hidden shadow-lg"
        >
          <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{collection.name}</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              {collection.description}
            </p>

            <div className="flex items-center space-x-4">
           
              <button
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-primary-dark"
                onClick={() => {
                  const updatedCollections = collections.map((item) =>
                    item.id === collection.id
                      ? { ...item, likes: item.likes + 1 }
                      : item
                  );
                  setCollections(updatedCollections);
                }}
              >
                <FaThumbsUp />
                <span>{collection.likes}</span>
              </button>


              <button
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-primary-dark"
                onClick={() => handleToggleCommentInput(collection.id)}
              >
                <FaCommentDots />
                <span>{collection.comments.length}</span>
              </button>

              <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-primary-dark">
                <FaShareAlt />
                <span>Share</span>
              </button>
            </div>

            {collection.showCommentInputs && (
              <div className="mt-4">
                <textarea
                  className="w-full p-2 border rounded-md"
                  rows="3"
                  placeholder="Add a comment..."
                  value={collection.newComment}
                  onChange={(e) => handleCommentChange(e, collection.id)}
                ></textarea>
                <button
                  className="bg-accent-light dark:bg-accent-dark text-white px-4 py-2 rounded-md mt-2"
                  onClick={() => handleAddComment(collection.id)}
                >
                  Add Comment
                </button>
              </div>
            )}

       
           <div className="mt-4">
            {collection.comments.length > 0 && (
              <ul className="space-y-2">
                {collection.comments.map((comment, index) => (
                  <li key={index} className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>{comment}</span>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteComment(collection.id, index)} // Delete comment
                    >
                      <FaTrash /> 
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {!collection.showCommentInputs && (
            <button
              className="text-primary-dark hover:text-primary-light"
              onClick={() => handleToggleCommentInput(collection.id)}
            >
              
            </button>
          )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
      No collections found.
    </p>
  )}
</main>


        <aside className="w-1/4 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg text-primary-dark font-semibold mb-4">Popular Community</h2>
            <ul className="space-y-4">
          
              {collections.slice(0, 8).map((collection) => (
                <li
                  key={collection.id}
                  className="flex items-center space-x-4 border-b pb-2"
                >
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-semibold">{collection.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {collection.description.slice(0, 50)}...
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <AddCollection
              onAdd={handleAddCollection}
              onClose={handleModalClose}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Community; 