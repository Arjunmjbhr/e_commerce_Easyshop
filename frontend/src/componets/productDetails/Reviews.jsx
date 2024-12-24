import React, { useEffect, useState } from "react";
import Ratings from "../Ratings";
import RatingTemp from "../RatingTemp";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { get_reviews } from "../../store/reducers/homeReducer";

const Reviews = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  const { product, rating_review, totalReviews, reviews } = useSelector(
    (store) => store.home
  );
  if (Object.keys(product).length === 0) {
    <div>...Loading</div>;
  }
  useEffect(() => {
    if (product._id) {
      dispatch(get_reviews({ pageNumber, productId: product._id }));
    }
  }, [dispatch, pageNumber, product._id]);
  const { rating } = product;
  return (
    <div className="mt-5  ">
      {/* Rating summary */}
      <div className=" gap-10 flex md:flex-col ">
        <div className="">
          <div className="flex flex-col gap-2 justify-center items-start">
            <div>
              <span className="font-bold text-[40px]">{rating}</span>
              <span className="font-bold text-[20px]">/</span>
              <span className="font-bold text-[20px]">5</span>
            </div>
            <div className="flex justify-start items-center">
              <Ratings ratings={rating} />
            </div>
            <div>
              <span>({totalReviews})</span>
            </div>
          </div>
        </div>
        {/* Rating detials */}
        <div className="flex gap-2 flex-col py-2 ">
          {/* rightside */}
          <div className="flex flex-row items-center gap-5">
            <div className="text-md flex gap-q w-[93px]">
              <RatingTemp ratings={5} />
            </div>
            <div className="h-[14px] w-[200px] bg-slate-200">
              <div
                className="h-full bg-yellow-400"
                style={{
                  width: `${
                    Math.ceil(
                      ((rating_review.find((review) => review._id === 5)
                        ?.count || 0) /
                        totalReviews) *
                        100
                    ) || 0
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-sm">
              {rating_review.find((review) => review._id === 5)?.count || 0}
            </p>
          </div>
          <div className="flex flex-row items-center gap-5">
            <div className="text-md flex gap-q w-[93px]">
              <RatingTemp ratings={4} />
            </div>
            <div className="h-[14px] w-[200px] bg-slate-200">
              <div
                className="h-full bg-yellow-400"
                style={{
                  width: `${
                    Math.ceil(
                      ((rating_review.find((review) => review._id === 4)
                        ?.count || 0) /
                        totalReviews) *
                        100
                    ) || 0
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-sm">
              {rating_review.find((review) => review._id === 4)?.count || 0}
            </p>
          </div>
          <div className="flex flex-row items-center gap-5">
            <div className="text-md flex gap-q w-[93px]">
              <RatingTemp ratings={3} />
            </div>
            <div className="h-[14px] w-[200px] bg-slate-200">
              <div
                className="h-full bg-yellow-400"
                style={{
                  width: `${
                    Math.ceil(
                      ((rating_review.find((review) => review._id === 3)
                        ?.count || 0) /
                        totalReviews) *
                        100
                    ) || 0
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-sm">
              {rating_review.find((review) => review._id === 3)?.count || 0}
            </p>
          </div>
          <div className="flex flex-row items-center gap-5">
            <div className="text-md flex gap-q w-[93px]">
              <RatingTemp ratings={2} />
            </div>
            <div className="h-[14px] w-[200px] bg-slate-200">
              <div
                className="h-full bg-yellow-400"
                style={{
                  width: `${
                    Math.ceil(
                      ((rating_review.find((review) => review._id === 2)
                        ?.count || 0) /
                        totalReviews) *
                        100
                    ) || 0
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-sm">
              {rating_review.find((review) => review._id === 2)?.count || 0}
            </p>
          </div>
          <div className="flex flex-row items-center gap-5">
            <div className="text-md flex gap-q w-[93px]">
              <RatingTemp ratings={1} />
            </div>
            <div className="h-[14px] w-[200px] bg-slate-200">
              <div
                className="h-full bg-yellow-400"
                style={{
                  width: `${
                    Math.ceil(
                      ((rating_review.find((review) => review._id === 1)
                        ?.count || 0) /
                        totalReviews) *
                        100
                    ) || 0
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-sm">
              {rating_review.find((review) => review._id === 1)?.count || 0}
            </p>
          </div>
        </div>
      </div>
      {/* reviews */}
      <div className="mt-5">
        <h2 className="font-bold text-lg ">Product Reviews ({totalReviews})</h2>
        <div className="flex flex-col gap-8 pb-10 pt-4">
          {reviews.map((rev, index) => {
            return (
              <div key={rev._id}>
                <div className="flex justify-between">
                  <div className="flex gap-1 ">
                    <Ratings ratings={rev.rating} />
                  </div>
                  <span className="text-slate-600">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="pb-3 pt-1">
                  <h4 className="font-semibold pb-1">{rev.name}</h4>
                  <p>{rev.review}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end">
          {
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItem={totalReviews}
              perPage={5}
              showItem={3}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Reviews;
