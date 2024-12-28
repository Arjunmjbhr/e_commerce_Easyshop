import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { post_blog, messageClear } from "../../store/Reducers/dashboardReducer";
import toast from "react-hot-toast";

const BlogAddingPage = () => {
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [heading, setHeading] = useState("");
  const [bloggerName, setBloggerName] = useState("");
  const [content, setContent] = useState("");
  const { userInfo } = useSelector((store) => store.auth);
  const { successMessage, errorMessage } = useSelector(
    (store) => store.dashboard
  );
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setShowImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    const formData = new FormData();
    if (!heading.trim() || !bloggerName.trim() || !content.trim()) {
      toast.error("All field are mandatory");
      return;
    }
    formData.append("heading", heading);
    formData.append("bloggerName", bloggerName);
    formData.append("content", content);
    formData.append("sellerId", userInfo._id);
    if (image) {
      formData.append("image", image);
    }

    dispatch(post_blog(formData));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setImage("");
      setHeading("");
      setBloggerName("");
      setContent("");
      setShowImage("");
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Add a New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="heading"
            className="block text-sm font-medium text-gray-700"
          >
            Blog Heading:
          </label>
          <input
            type="text"
            id="heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            required
            className="mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="blogger-name"
            className="block text-sm font-medium text-gray-700"
          >
            Blogger Name:
          </label>
          <input
            type="text"
            id="blogger-name"
            value={bloggerName}
            onChange={(e) => setBloggerName(e.target.value)}
            required
            className="mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="6"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
          {showImage && (
            <div className="mt-4">
              <img
                src={showImage}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default BlogAddingPage;
