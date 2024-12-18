import React from "react";
import Ratings from "../Ratings";
import { FaHeart } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const ProductSpec = ({
  product,
  decrementCount,
  incrementCount,
  quantity,
  add_cart,
  add_wishlist,
}) => {
  const navigate = useNavigate();
  const {
    discount,
    name,
    stock,
    rating,
    price,
    description,
    validOfferPercentage,
  } = product;
  let discountOrOffer =
    discount > validOfferPercentage ? discount : validOfferPercentage;

  const buyNow = () => {
    const { discount, price, sellerId, shopName, validOfferPercentage } =
      product;
    const discountOrValidOffer = Math.max(discount, validOfferPercentage);
    let productPrice =
      (price - Math.floor((price * discountOrValidOffer) / 100)) * quantity;
    let sellerPrice = Math.floor(0.95 * productPrice);
    const productDetailsToTransfer = [
      {
        sellerId: sellerId,
        shopName: shopName,
        price: sellerPrice,
        products: [
          {
            validOfferPercentage,
            quantity,
            productInfo: product,
          },
        ],
      },
    ];
    navigate("/shipping", {
      state: {
        products: productDetailsToTransfer,
        price: productPrice,
        shipping_fee: 20,
        items: 1,
      },
    });
  };

  return (
    <div>
      <div>
        <div className="flex flex-col justify-start gap-4">
          <h1 className="text-2xl font-bold ">{name}</h1>
          {/* rating */}
          <div className="flex justify-start items-center gap-5">
            <div className="flex ">
              <Ratings ratings={rating} />
            </div>

            <span>(32 reviews)</span>
          </div>
          {/* discount and price */}
          <div>
            {discountOrOffer !== 0 ? (
              <div className="flex justify-start gap-3">
                <h2 className=" text-red-600 text-xl font-bold">Price</h2>
                <h2 className="line-through text-red-600 text-xl font-bold">
                  {price}
                </h2>
                <h2 className=" text-red-600 text-xl font-bold">
                  ₹{price - Math.floor((discountOrOffer * price) / 100)}
                  (-
                  {discountOrOffer}%)
                </h2>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className=" text-red-600 text-xl font-bold">Price :</h2>
                <h2 className=" text-red-600 text-xl font-bold">{price}</h2>
              </div>
            )}
          </div>
          {/* description */}
          <div className="text-slate-600">
            <p>{description}</p>
          </div>
          {/* count product & cart &  wishlist  */}
          <div className="flex justify-start items-center gap-4 mt-5">
            {product.stock ? (
              <div className="flex gap-4 ">
                <div className="w-[120px] bg-zinc-300 flex justify-center items-center gap-5 px-2 py-2 font-bold rounded-md text-xl">
                  <button
                    onClick={decrementCount}
                    className="cursor-pointer w-[20px] h-[20px] flex justify-center rounded-full items-center hover:bg-zinc-600 hover:text-white"
                  >
                    -
                  </button>
                  <div className="text-lg font-semibold">{quantity}</div>
                  <button
                    onClick={incrementCount}
                    className="cursor-pointer w-[20px] h-[20px] flex justify-center rounded-full items-center hover:bg-zinc-600 hover:text-white"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={add_cart}
                  className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#059473] text-white"
                >
                  Add To Cart
                </button>
              </div>
            ) : (
              ""
            )}
            <div
              onClick={() => add_wishlist(product)}
              className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white"
            >
              <FaHeart />
            </div>
          </div>
          {/* chat & buy & share and avilability */}
          <div className="flex flex-row mx-10 gap-5">
            {/* left side */}
            <div className="w-[150px] text-black font-bold text-base flex flex-col gap-5">
              <span>Availability</span>
              <span>Share On</span>
            </div>
            {/* right side */}
            <div className="flex  gap-5 flex-col">
              <span
                className={`${
                  stock ? "text-green-800" : "text-red-500"
                } font-bold`}
              >
                {stock ? `In Stock(${stock})` : "Out Of Stock"}
              </span>
              <ul className="flex justify-start items-center gap-3">
                <li>
                  <div
                    className="w-[30px] h-[30px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white"
                    href="#"
                  >
                    <FaFacebookF />
                  </div>
                </li>
                <li>
                  <div
                    className="w-[30px] h-[30px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full text-white"
                    href="#"
                  >
                    <FaTwitter />
                  </div>
                </li>
                <li>
                  <div
                    className="w-[30px] h-[30px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-purple-500 rounded-full text-white"
                    href="#"
                  >
                    <FaLinkedin />
                  </div>
                </li>
                <li>
                  <div
                    className="w-[30px] h-[30px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-blue-500 rounded-full text-white"
                    href="#"
                  >
                    <FaGithub />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* buy now and chat  */}
          <div className="flex gap-3 mx-10 mb-5">
            {stock ? (
              <button
                onClick={buyNow}
                className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#247462] text-white"
              >
                Buy Now
              </button>
            ) : (
              ""
            )}
            <Link
              to="#"
              className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 text-white"
            >
              Chat Seller
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSpec;
