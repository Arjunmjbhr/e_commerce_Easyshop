import React from "react";
import Header from "../componets/Header";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";

const ContactUs = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
        {/* Header */}

        {/* Main Content */}
        <main className="flex-grow bg-green-50 py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-12">
              {/* Contact Details */}
              <div className="bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                  Get in Touch
                </h2>
                <p className="text-gray-600 mb-6">
                  We’d love to hear from you! Reach out to us through any of the
                  below channels:
                </p>
                <ul className="space-y-4 text-gray-700">
                  <li>
                    <strong>Address:</strong> TechnoPark, Kochi, Kerala
                  </li>
                  <li>
                    <strong>Phone:</strong>{" "}
                    <a
                      href="tel:987676687688"
                      className="text-blue-600 hover:underline"
                    >
                      987676687688
                    </a>
                  </li>
                  <li>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:easyshop@gmail.com"
                      className="text-blue-600 hover:underline"
                    >
                      easyshop@gmail.com
                    </a>
                  </li>
                </ul>

                {/* Social Media Links */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">
                    Follow Us
                  </h3>
                  <div className="flex text-2xl space-x-6 text-gray-600">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-pink-600"
                    >
                      <FaInstagramSquare />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400"
                    >
                      <AiFillTwitterCircle />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      <FaFacebook />
                    </a>
                  </div>
                </div>
              </div>

              {/* Subscribe Section */}
              <div className="bg-white shadow-md rounded-lg p-8">
                <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                  Join Our Team
                </h3>
                <p className="text-gray-600 mb-6">
                  Stay updated with the latest news and updates from Easy Shop.
                  Subscribe below!
                </p>
                <form>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 mb-4"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md py-3 font-medium hover:from-blue-700 hover:to-blue-900"
                  >
                    Subscribe
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    By subscribing, you agree to our{" "}
                    <a href="#" className="text-blue-500 underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-500 underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              </div>
            </div>

            {/* Additional Sections */}
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-1 gap-12">
              {/* Make Money With Us */}
              <div className="bg-white shadow-md rounded-lg p-8">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">
                  Make Money with Us
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Sell on Easy Shop</li>
                  <li>Sell Your Services on Easy Shop</li>
                  <li>Supply to Easy Shop</li>
                  <li>Sell Your Apps on Grogin</li>
                  <li>Become an Affiliate</li>
                  <li>Advertise Your Products</li>
                </ul>
              </div>

              {/* Let Us Help You */}
              <div className="bg-white shadow-md rounded-lg p-8">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">
                  Let Us Help You
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Accessibility Statement</li>
                  <li>Returns & Replacements</li>
                  <li>Shipping Rates & Policies</li>
                  <li>Refund and Returns Policy</li>
                  <li>Privacy Policy</li>
                  <li>Terms and Conditions</li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-green-600 text-white py-6 text-center">
          <p>© 2024 Easy Shop. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default ContactUs;
