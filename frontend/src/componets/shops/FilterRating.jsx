import React from "react";
import RatingTemp from "../RatingTemp";

const FilterRating = ({ setRating }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-bold mb-3 text-slate-600">Rating</h2>
      <div onClick={() => setRating(5)} className="flex gap-2 cursor-pointer">
        <RatingTemp ratings={5} />
      </div>
      <div onClick={() => setRating(4)} className="flex gap-2 cursor-pointer">
        <RatingTemp ratings={4} />
      </div>
      <div onClick={() => setRating(3)} className="flex gap-2 cursor-pointer">
        <RatingTemp ratings={3} />
      </div>
      <div onClick={() => setRating(2)} className="flex gap-2 cursor-pointer">
        <RatingTemp ratings={2} />
      </div>
      <div onClick={() => setRating(1)} className="flex gap-2 cursor-pointer">
        <RatingTemp ratings={1} />
      </div>
      <div onClick={() => setRating(0)} className="flex gap-2 cursor-pointer">
        <RatingTemp ratings={0} />
      </div>
    </div>
  );
};

export default FilterRating;
