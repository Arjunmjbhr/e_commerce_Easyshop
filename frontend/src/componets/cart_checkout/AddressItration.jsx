import React from "react";

const AddressItration = ({ address, inputState, setRes }) => {
  return (
    <div className="my-3 bg-slate-200 p-3 rounded-lg">
      <div className="pr-8">
        <div className="flex flex-col gap-1">
          <div className="flex gap-3">
            <h2 className="text-slate-600 font-semibold pb-2">Deliver To</h2>
            <h2 className="text-slate-600 font-semibold pb-2 uppercase">
              {address?.name}
            </h2>
          </div>
          <p className="lowercase">
            <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
              <input type="checkbox" name="" id="" />
            </span>
            <span className="lowercase">
              {address?.address},{address?.district},{address?.city},
              {address?.area},{address?.phone},{`post: ${address?.post}`}
            </span>
            <span
              onClick={() => setRes(false)}
              className="text-indigo-500 cursor-pointer mx-2"
            >
              Change
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddressItration;
