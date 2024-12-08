import React from "react";

const AddressForm = ({
  inputState,
  inputHandle,
  save,
  setIsAddressEditing,
}) => {
  return (
    <div className="bg-zinc-200 p-3">
      <form onSubmit={save}>
        {/* name and Address */}
        <div className="flex flex-col w-full text-slate-600 gap-3 ">
          <div className="flex flex-col gap-1 mb-2  w-full ">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
              name="name"
              id="name"
              value={inputState?.name}
              onChange={inputHandle}
              placeholder="Name"
              required
            />
          </div>
          <div className="flex flex-col gap-1 mb-2 w-full">
            <label htmlFor="name">Address</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
              name="address"
              id="address"
              value={inputState?.address}
              onChange={inputHandle}
              placeholder="House No/ Building/ Street/ Area"
              required
            />
          </div>
        </div>
        {/* Phone and post */}
        <div className="flex md:flex-col md:gap-2 w-full text-slate-600 gap-3 ">
          <div className="flex flex-col gap-1 mb-2  w-full ">
            <label htmlFor="phone">Phone</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
              name="phone"
              id="phone"
              value={inputState?.phone}
              onChange={inputHandle}
              placeholder="Phone"
              required
            />
          </div>
          <div className="flex flex-col gap-1 mb-2 w-full">
            <label htmlFor="post">Post</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
              name="post"
              id="post"
              value={inputState?.post}
              onChange={inputHandle}
              placeholder="Pin Number"
              required
            />
          </div>
        </div>
        {/* District and City */}
        <div className="flex md:flex-col md:gap-2 w-full text-slate-600 gap-3 ">
          <div className="flex flex-col gap-1 mb-2  w-full ">
            <label htmlFor="district">District</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
              name="district"
              id="district"
              value={inputState?.district}
              onChange={inputHandle}
              placeholder="District"
              required
            />
          </div>
          <div className="flex flex-col gap-1 mb-2 w-full">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
              name="city"
              id="city"
              value={inputState?.city}
              onChange={inputHandle}
              placeholder="City"
              required
            />
          </div>
        </div>
        {/* Area and Submit button */}
        <div className="flex md:flex-col md:gap-2 w-full text-slate-600 gap-3 ">
          <div className="flex flex-col gap-1 mb-2  w-full ">
            <label htmlFor="area">Area</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
              name="area"
              id="area"
              value={inputState?.area}
              onChange={inputHandle}
              placeholder="Area"
              required
            />
          </div>
          <div className="flex flex-col gap-1 mt-8 mb-2 w-full">
            {setIsAddressEditing && (
              <button className="px-3 py-[6px] rounded-sm hover:shadow-green-500/50 hover:shadow-lg bg-green-500 text-white">
                Add
              </button>
            )}
            {!setIsAddressEditing && (
              <button className="px-3 py-[6px] rounded-sm hover:shadow-green-500/50 hover:shadow-lg bg-green-500 text-white">
                Save Change
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
