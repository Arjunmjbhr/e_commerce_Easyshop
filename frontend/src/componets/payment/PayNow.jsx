import React from "react";

const PayNow = ({ SetModalClose }) => {
  return (
    <div>
      <div className="w-full px-4 py-8 bg-white shadow-sm flex items-center ">
        <h1 className=" mx-4">Pay as cash on delivery</h1>
        <button
          onClick={() => SetModalClose(false)}
          className="px-10 py-[6px] rounded-sm hover:shadow-green-500/20 hover:shadow-lg bg-[#059473] text-white"
        >
          Pay As COD
        </button>
      </div>
    </div>
  );
};

export default PayNow;
