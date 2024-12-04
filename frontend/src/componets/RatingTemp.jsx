import React from "react";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const RatingTemp = ({ ratings }) => {
  if (ratings === 5) {
    return (
      <>
        <span className="text-orange-500">
          <FaStar />
        </span>
        <span className="text-orange-500">
          <FaStar />
        </span>
        <span className="text-orange-500">
          <FaStar />
        </span>
        <span className="text-orange-500">
          <FaStar />
        </span>
        <span className="text-orange-500">
          <FaStar />
        </span>
      </>
    );
  } else if (ratings === 4) {
    return (
      <>
        <span className="text-orange-500">
          <FaStar />
        </span>
        <span className="text-orange-500">
          <FaStar />
        </span>
        <span className="text-orange-500">
          <FaStar />
        </span>
        <span className="text-orange-500">
          <FaStar />
        </span>
        <span className="text-orange-500">
          <CiStar />
        </span>
      </>
    );
  } else if (ratings === 3) {
    return (
      <>
        <span className="text-orange-500">
          <FaStar />
        </span>
        <span className="text-orange-500">
          <FaStar />
        </span>
        <span className="text-orange-500">
          <FaStar />
        </span>
        <span className="text-orange-500">
          <CiStar />
        </span>
        <span className="text-orange-500">
          <CiStar />
        </span>
      </>
    );
  } else if (ratings === 2) {
    return (
      <>
        <span className="text-orange-500">
          <FaStar />
        </span>
        <span className="text-orange-500">
          <FaStar />
        </span>
        <span className="text-orange-500">
          <CiStar />
        </span>
        <span className="text-orange-500">
          <CiStar />
        </span>
        <span className="text-orange-500">
          <CiStar />
        </span>
      </>
    );
  } else if (ratings === 1) {
    return (
      <>
        <span className="text-orange-500">
          <FaStar />
        </span>
        <span className="text-orange-500">
          <CiStar />
        </span>
        <span className="text-orange-500">
          <CiStar />
        </span>
        <span className="text-orange-500">
          <CiStar />
        </span>
        <span className="text-orange-500">
          <CiStar />
        </span>
      </>
    );
  } else {
    return (
      <>
        <span className="text-orange-500">
          <CiStar />
        </span>
        <span className="text-orange-500">
          <CiStar />
        </span>
        <span className="text-orange-500">
          <CiStar />
        </span>
        <span className="text-orange-500">
          <CiStar />
        </span>
        <span className="text-orange-500">
          <CiStar />
        </span>
      </>
    );
  }
};

export default RatingTemp;
