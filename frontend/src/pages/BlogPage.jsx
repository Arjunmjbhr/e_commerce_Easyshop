import React, { useEffect } from "react";
import Header from "../componets/Header";
import { useDispatch, useSelector } from "react-redux";
import { get_blog } from "../store/reducers/homeReducer";

const BlogPage = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.home);
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Revolutionary Smartwatch 2.0",
      image: "https://via.placeholder.com/400",
      description:
        "Experience the next generation of smartwatches with advanced fitness tracking, customizable dials, and more!",
      date: "December 26, 2024",
      seller: "TechWorld Innovations",
    },
    {
      id: 2,
      title: "Eco-Friendly Home Robot",
      image: "https://via.placeholder.com/400",
      description:
        "Introducing a robot that helps you clean, organize, and maintain your home with sustainable energy!",
      date: "December 20, 2024",
      seller: "GreenTech Co.",
    },
    {
      id: 3,
      title: "Wireless Earbuds X",
      image: "https://via.placeholder.com/400",
      description:
        "Immerse yourself in unparalleled sound quality with our latest wireless earbuds featuring active noise cancellation.",
      date: "December 18, 2024",
      seller: "AudioPro Solutions",
    },
  ];
  useEffect(() => {
    dispatch(get_blog());
  }, [dispatch]);

  return (
    <div>
      <div>
        <Header />
      </div>
      <section>
        <div className="min-h-screen bg-gradient-to-br from-green-50  to-green-100">
          {/* Main Content */}

          <main className="py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="space-y-8">
                {blog.map((post) => {
                  const {
                    heading,
                    _id,
                    bloggerName,
                    content,
                    imageUrl,
                    createdAt,
                  } = post;
                  return (
                    <article
                      key={_id}
                      className="bg-white shadow-md rounded-lg overflow-hidden flex items-center p-4"
                    >
                      {/* Left: Image */}
                      <div className="w-32 h-32 flex-shrink-0">
                        <img
                          src={imageUrl}
                          alt={heading}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>

                      {/* Right: Content */}
                      <div className="ml-6 flex-grow">
                        <h2 className="text-2xl font-semibold text-blue-800">
                          {heading}
                        </h2>
                        <p className="text-sm text-gray-500 mb-2">
                          By {bloggerName} |{" "}
                          {new Date(createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 mb-4">{content}</p>
                        <a
                          href="#"
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          Read More →
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-blue-600 text-white py-6">
            <div className="text-center">
              <p>© 2024 Easy Shop. All rights reserved.</p>
              <p className="text-sm mt-2">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>{" "}
                |{" "}
                <a href="#" className="hover:underline">
                  Terms & Conditions
                </a>
              </p>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
