import React, { useState, useEffect } from "react";

const AddressItration = ({
  address,
  inputState,
  setRes,
  isAddressEditing,
  setIsAddressEditing,
  setInputState,
  selectedOption,
  setSelectedOption,
  setIsAddressSelected,
}) => {
  const handleChange = (address) => {
    setInputState({
      name: address?.name,
      address: address?.address,
      phone: address?.phone,
      post: address?.post,
      district: address?.district,
      city: address?.city,
      area: address?.area,
      addressId: address._id,
    });
    setRes(false);
    setIsAddressEditing(true);
    console.log(address);
  };

  const handleRadioChange = (address) => {
    // Check if the radio button is already selected
    if (selectedOption === address?._id) {
      // If the same option is selected, no need to update
      console.log("Same option selected, no update.");
      return;
    }

    // Set the selected option to the clicked address's ID
    setSelectedOption(address?._id);
    setInputState({
      name: address?.name,
      address: address?.address,
      phone: address?.phone,
      post: address?.post,
      district: address?.district,
      city: address?.city,
      area: address?.area,
      addressId: address._id,
    });
    setIsAddressSelected(true);
    console.log("Radio Button Selected: ", address);
  };

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
              <input
                type="radio"
                name="address" // Same name for all radio buttons in the group
                onChange={() => handleRadioChange(address)}
                checked={selectedOption === address?._id}
              />
            </span>
            <span className="lowercase">
              {address?.address}, {address?.district}, {address?.city},{" "}
              {address?.area}, {address?.phone}, {`post: ${address?.post}`}
            </span>
            <span
              onClick={() => handleChange(address)}
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
