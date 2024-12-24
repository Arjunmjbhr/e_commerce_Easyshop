import React, { useState, useEffect, useRef } from "react";
import Header from "./../componets/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import Footer from "../componets/Footer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Reviews from "../componets/productDetails/Reviews";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { get_products, get_categories } from "../store/reducers/homeReducer";
import { product_details } from "../store/reducers/homeReducer";
import ProductImageZoom from "../componets/ProductImageZoom";
import PageHeading from "../componets/PageHeading";
import { toast } from "react-hot-toast";
import { add_to_cart, messageClear } from "../store/reducers/cartReducer";
import {
  add_to_wishlist,
  messageClearWishlist,
} from "../store/reducers/wishlistReducer";
import ProductSpec from "../componets/productDetails/ProductSpec";
import RelatedProducts from "../componets/productDetails/RelatedProducts";
import ProductFromSameShop from "../componets/productDetails/ProductFromSameShop";

const Details = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [image, setImage] = useState("");
  const [state, setState] = useState("reviews");
  const [quantity, setQuantity] = useState(1);
  const elementRef = useRef(null);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 800, min: 750 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 750, min: 600 },
      items: 3,
    },
    xsmobile: {
      breakpoint: { max: 610, min: 460 },
      items: 2,
    },
    xxsmobile: {
      breakpoint: { max: 460, min: 0 },
      items: 2,
    },
  };
  // subscribe to store
  const { product, relatedProducts, moreProducts } = useSelector(
    (store) => store.home
  );
  const { wishlistErrorMessage, wishlistSuccessMessage } = useSelector(
    (store) => store.wishlist
  );
  const { userInfo } = useSelector((state) => state.authUser);
  const { errorMessage, successMessage } = useSelector((state) => state.cart);

  //when ever we select new product then scroll to product details view using useRef
  const handleScroll = () => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({
        behavior: "smooth", // Optional: adds smooth scrolling
        block: "start", // Aligns the element at the top of the screen
      });
    }
  };

  useEffect(() => {
    dispatch(get_products());
    dispatch(get_categories());
  }, [dispatch]);
  useEffect(() => {
    dispatch(product_details(slug));
    setImage("");
    handleScroll();
  }, [slug, dispatch]);

  // toast message for success and failure
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);
  useEffect(() => {
    if (wishlistSuccessMessage) {
      toast.success(wishlistSuccessMessage);
      dispatch(messageClearWishlist());
    }
    if (wishlistErrorMessage) {
      toast.error(wishlistErrorMessage);
      dispatch(messageClearWishlist());
    }
  }, [wishlistErrorMessage, wishlistSuccessMessage, dispatch]);

  // add to wishlist
  const add_wishlist = (product) => {
    if (userInfo) {
      const data = {
        userId: userInfo.id,
        productId: product._id,
      };
      dispatch(add_to_wishlist(data));
    } else {
      toast.error("Please login to add product to wishlist");
      navigate("/login");
    }
  };
  // add to cart
  const add_cart = () => {
    if (userInfo) {
      dispatch(
        add_to_cart({
          userId: userInfo.id,
          quantity,
          productId: product._id,
        })
      );
    } else {
      navigate("/login");
    }
  };
  const incrementCount = () => {
    if (quantity >= product.stock) {
      toast.error("Out of Stock");
    } else if (quantity >= 5) {
      toast.error("you can only buy maximum 5 piece per item in single order");
    } else {
      setQuantity(quantity + 1);
    }
  };
  const decrementCount = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <Header />
      {/* page heading with image */}
      <section>
        <PageHeading
          heading="Product Details"
          breadcrumbs={{
            Home: "/",
            Category: `/products?category=${product.category}`,
            product: "",
          }}
        />
      </section>
      {/* Breadcrumbs  */}
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className="flex justify-start items-center gap-2 m-2 font-semibold ">
            <Link to="/">Home</Link>
            <span>
              <FaAngleRight />
            </span>
            <Link to={`/products?category=${product.category}`}>
              {product.category}
            </Link>
            <span>
              <FaAngleRight />
            </span>
            <span>{product.name}</span>
          </div>
        </div>
      </section>
      {/* product details with product image and product details */}
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8">
            {/* product image layout */}
            <div ref={elementRef}>
              <div>
                <ProductImageZoom
                  imageUrl={image ? `${image}` : `${product?.images?.[0]}`}
                />
                {/* <img
                  className="h-[400px] w-full"
                  src={image ? `${image}` : `${product?.images?.[0]}`}
                  alt="images"
                /> */}
                {/* carousel */}
                <div className="my-8">
                  {product.images && (
                    <Carousel
                      autoPlay={true}
                      infinite={true}
                      arrows={true}
                      showDots={false}
                      transitionDuration={500}
                      responsive={responsive}
                    >
                      {product.images.map((img, index) => (
                        <div
                          key={index}
                          onClick={() => setImage((prev) => img)}
                        >
                          <div className=" relative flex justify-center items-center ">
                            <img
                              src={`${img}`}
                              alt="images"
                              className="h-[120px]   object-cover cursor-pointer "
                            />
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  )}
                </div>
              </div>
            </div>
            {/* product details layout */}
            <div className="flex flex-col justify-start">
              <ProductSpec
                add_wishlist={add_wishlist}
                product={product}
                decrementCount={decrementCount}
                incrementCount={incrementCount}
                quantity={quantity}
                add_cart={add_cart}
              />
            </div>
          </div>
        </div>
      </section>
      {/* reviews & description &  Products from same shop */}
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
          <div className="flex flex-wrap">
            {/*  Description and Reviews */}
            <div className="w-[72%] md-lg:w-full">
              {/* button for description and reviews */}
              <div className="grid grid-cols-2">
                <button
                  onClick={() => setState("reviews")}
                  className={` text-white py-2  ${
                    state === "reviews" ? "bg-green-800" : "bg-slate-500"
                  } `}
                >
                  Reviews
                </button>
                <button
                  onClick={() => setState("description")}
                  className={` text-white py-2  ${
                    state === "description" ? "bg-green-800" : "bg-slate-500"
                  } `}
                >
                  Description
                </button>
              </div>
              {/* reviews and description content */}
              <div>
                {state === "reviews" ? (
                  <Reviews />
                ) : (
                  <p className="mt-10 ">{product.description}</p>
                )}
              </div>
            </div>
            {/*  Products from same shop */}
            <div className="w-[28%] md-lg:w-full">
              <ProductFromSameShop
                product={product}
                moreProducts={moreProducts}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Related Proudcts */}
      <section>
        <RelatedProducts relatedProducts={relatedProducts} />
      </section>
      <Footer />
    </div>
  );
};

export default Details;
