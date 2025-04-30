import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import {toast} from "react-hot-toast"

const NewsFormModal = ({ showModal, closeModal, setTemp }) => {
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    postalCircle: "",
    image: "",
    imageFile: null,
    imagePreview: "",
  });
  const [postalCircles, setPostalCircles] = useState([]);

  const modalRef = useRef();

  // Disable body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showModal, closeModal]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/postal-circles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPostalCircles(res.data);
      })
      .catch((error) => {
        console.error("Error fetching News:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prevState) => ({
        ...prevState,
        imageFile: file,
        imagePreview: imageUrl,
        image: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/news", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTemp(1);
        console.log("res", res.data);
        toast.success("News data submitted successfully !");  
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error("Failed to submit news data"); 
      });
  
    console.log("News data submitted:", formData);
    closeModal();
    setFormData({
      title: "",
      description: "",
      image: "",
      imageFile: null,
      imagePreview: "",
      postalCircle: "",
    });
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div
          ref={modalRef}
          className="bg-white dark:bg-background-dark dark:text-white p-6 rounded-lg w-full md:max-w-2xl max-w-xs h-4/5 overflow-y-auto relative"
        >
          <button
            onClick={closeModal}
            className="absolute top-6 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <IoClose className="h-6 w-6 text-black dark:text-white" />
          </button>

          <h2 className="text-2xl font-bold mb-4">Create News</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-text-light dark:text-text-dark mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md dark:bg-background-dark dark:border-input-dark-border"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-text-light dark:text-text-dark mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md dark:bg-background-dark dark:border-input-dark-border"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="postalCircle"
                className="block text-text-light dark:text-text-dark mb-2"
              >
                Postal Circle
              </label>
              <select
                id="postalCircle"
                name="postalCircle"
                value={formData.postalCircle}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md dark:bg-background-dark dark:border-input-dark-border"
              >
                <option value="">Select Postal Circle</option>
                {postalCircles.map((circle) => (
                  <option key={circle._id} value={circle.name}>
                    {circle.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-text-light dark:text-text-dark mb-2">
                Image
              </label>

              {/* Image URL Input */}
              <input
                type="text"
                placeholder="Enter Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded-md dark:bg-background-dark dark:border-input-dark-border"
                disabled={formData.imageFile !== null}
              />

              {/* Image File Input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 mb-2 border rounded-md dark:bg-background-dark dark:border-input-dark-border"
                disabled={formData.image !== ""}
              />

              {/* Image Preview */}
              {formData.imagePreview && (
                <img
                  src={formData.imagePreview}
                  alt="Image Preview"
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
              )}
            </div>

            <div className="flex justify-end items-center mt-4">
              <button
                type="submit"
                className="bg-primary-dark text-white py-2 px-4 rounded-lg hover:bg-primary-light"
              >
                Create News
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default NewsFormModal;
