import React, { useState } from "react";
import RatingReact from "react-rating";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { customer_review } from "../../store/reducers/orderReducer";
import toast from "react-hot-toast";
const ProductReview = ({ product, order }) => {
  const [comment, setComment] = useState("");
  const [star, setStar] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.authUser);

  const handleReview = () => {
    if (!comment.trim() || star < 1) {
      toast.error("Rating and Review is Mandatory");
      return;
    }
    const data = {
      productId: product._id,
      orderId: order._id,
      review: comment,
      rating: star,
      name: userInfo.name,
    };
    dispatch(customer_review(data));
    console.log("review submitted");
  };
  return (
    <div className="my-3">
      <div>
        <RatingReact
          onChange={(e) => setStar(e)}
          initialRating={star}
          emptySymbol={
            <span className="text-slate-600 ">
              <CiStar />
            </span>
          }
          fullSymbol={
            <span className="text-orange-600 ">
              <FaStar />
            </span>
          }
        />
      </div>
      <div>
        <textarea
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          className="border text-sm outline-none focus:border-blue-500 p-2 rounded-lg"
          name=""
          id=""
          cols="60"
          rows="5"
          required
        ></textarea>
        <div className="flex justify-end">
          <div
            onClick={handleReview}
            className=" cursor-pointer py-1 rounded-md bg-blue-500 text-white w-20  text-center"
          >
            submit
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
