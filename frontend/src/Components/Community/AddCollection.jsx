import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const AddCollection = ({ onClose, onAdd }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [media, setMedia] = useState(null);

  const handleEmojiClick = (event, emojiObject) => {
    setPostContent((prevContent) => prevContent + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleMediaUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      if (file.type.startsWith("image/")) {
        reader.onloadend = () => {
          setMedia({ type: "image", src: reader.result });
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith("video/")) {
        setMedia({ type: "video", src: URL.createObjectURL(file) });
      } else {
        alert("Please upload an image or video.");
      }
    }
  };

  const handlePost = () => {
    if (collectionName.trim() && (postContent.trim() || media)) {
      onAdd({ collectionName, content: postContent, media: media });
      onClose();
    } else {
      alert("Please add a collection name and content or an image/video.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-11/12 max-w-xl bg-white shadow-lg rounded-lg p-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center border rounded transition text-black dark:text-primary-light"
          style={{
            border: "none",
            fontSize: "30px",
            fontWeight: "bold",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          &times;
        </button>

        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Darshil kothiya</h1>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Collection Name"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
          />
        </div>

        <div>
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="What do you want to talk about?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
        </div>

        {media && (
          <div className="mt-4">
            {media.type === "image" ? (
              <img
                src={media.src}
                alt="Uploaded"
                className="w-full h-64 object-cover rounded-md"
              />
            ) : (
              <video controls className="w-full h-64 rounded-md">
                <source src={media.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <span className="text-lg">☺</span>
            </button>
            {showEmojiPicker && (
              <div className="absolute mt-12 z-10">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}

            <button
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <span className="text-lg">🖼️</span>
            </button>
            <input
              id="fileInput"
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleMediaUpload}
            />
          </div>
          <button
            onClick={handlePost}
            className="px-4 py-2 bg-accent-light text-primary-light dark:text-primary-dark rounded-lg hover:bg-accent-dark"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCollection;
