import React, { useEffect, useState } from "react";
import { FaImages } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  get_user_info,
  messageClear,
  update_seller_profile_info,
} from "../../store/Reducers/authReducer";

const Profile = () => {
  const status = "active";

  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("");
  const [show, setShow] = useState("");
  const [userData, setUserData] = useState({
    shopName: "",
    address: "",
    district: "",
    state: "",
    pin: "",
  });
  const { userInfo, successMessage, errorMessage } = useSelector(
    (store) => store.auth
  );
  useEffect(() => {
    dispatch(get_user_info());
  }, [successMessage, dispatch]);
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
  // handling the images and shop info
  const handleProfileImage = (e) => {
    const { files } = e.target;
    console.log(files);
    if (files && files.length > 0) {
      setProfileImage(files[0]);
      setShow(URL.createObjectURL(files[0]));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData) {
      toast.error("User data is missing");
      return;
    }

    const { shopName, address, district, state, pin } = userData;

    if (
      !shopName.trim() ||
      !address.trim() ||
      !district.trim() ||
      !state.trim() ||
      !pin.trim() ||
      !profileImage
    ) {
      toast.error("All fields are mandatory");
      return;
    }

    if (isNaN(pin)) {
      toast.error("PIN must be numeric");
      return;
    }

    const formData = new FormData();
    formData.append("userData", JSON.stringify(userData));
    formData.append("sellerId", userInfo._id);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    dispatch(update_seller_profile_info(formData));
  };

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full">
          <div className="w-full flex flex-col justify-center items-center  p-4 bg-[#6a5fdf] shadow-md rounded-md text-[#d0d2d6]">
            <h1 className="flex  text-3xl mb-7 font-bold text-white">
              Shop Profile
            </h1>
            <div className="w-full">
              {/* user details on login */}
              <div className="flex justify-center items-center py-3">
                {userInfo ? (
                  <label
                    htmlFor="img"
                    className="h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden"
                  >
                    <img src={userInfo.image || show} alt="profileimage" />
                  </label>
                ) : (
                  <label
                    className="flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 border-[#d0d2d6] relative"
                    htmlFor="img"
                  >
                    <span>
                      <FaImages />
                    </span>
                    <span>Select Image</span>
                  </label>
                )}
                <input
                  onChange={handleProfileImage}
                  type="file"
                  className="hidden"
                  id="img"
                />
              </div>

              <div className="flex w-full  ">
                <div className="px-0 md:px-5 py-2 w-full">
                  <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                    <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                      <FaRegEdit />{" "}
                    </span>
                    <div className="flex gap-2">
                      <span>Name : </span>
                      <span>{userInfo.username}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Email : </span>
                      <span>{userInfo.email}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Role : </span>
                      <span>Seller</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Status : </span>
                      <span>{userInfo.status}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Payment Account : </span>
                      <p>
                        {userInfo.status === "active" ? (
                          <span className="bg-green-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                            {userInfo.payment}
                          </span>
                        ) : (
                          <span className="bg-blue-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded">
                            Click Active
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                {/* additional shop details */}
                <div className="px-0 md:px-5 py-2 w-full ">
                  {!userInfo.shopInfo ? (
                    <form className="bg-slate-800 p-4 rounded-md ">
                      <div className="flex flex-col w-full gap-1 mb-2 ">
                        <label htmlFor="Shop">Shop Name</label>
                        <input
                          className="px-4 py-2 focus:border-indigo-200 outline-none text-black border border-slate-700 rounded-md "
                          type="text"
                          name="shopName"
                          id="Shop"
                          value={userData.shopName}
                          onChange={handleChange}
                          placeholder="Shop Name"
                        />
                      </div>

                      <div className="flex flex-col w-full gap-1 mb-2">
                        <label htmlFor="address">Address</label>
                        <input
                          className="px-4 py-2 focus:border-indigo-200 outline-none text-black border border-slate-700 rounded-md "
                          type="text"
                          name="address"
                          id="address"
                          value={userData.address}
                          onChange={handleChange}
                          placeholder="Address"
                        />
                      </div>

                      <div className="flex flex-col w-full gap-1 mb-2">
                        <label htmlFor="district">District Name</label>
                        <input
                          className="px-4 py-2 focus:border-indigo-200 outline-none text-black border border-slate-700 rounded-md "
                          type="text"
                          name="district"
                          id="district"
                          value={userData.district}
                          onChange={handleChange}
                          placeholder="District Name"
                        />
                      </div>

                      <div className="flex flex-col w-full gap-1 mb-2">
                        <label htmlFor="state">State</label>
                        <input
                          className="px-4 py-2 focus:border-indigo-200 outline-none text-black  border border-slate-700 rounded-md "
                          type="text"
                          name="state"
                          id="state"
                          value={userData.state}
                          onChange={handleChange}
                          placeholder="State"
                        />
                      </div>
                      <div className="flex flex-col w-full gap-1 mb-2">
                        <label htmlFor="=pin">PIN</label>
                        <input
                          className="px-4 py-2 focus:border-indigo-200 outline-none text-black border border-slate-700 rounded-md "
                          type="text"
                          name="pin"
                          id="pin"
                          value={userData.pin}
                          onChange={handleChange}
                          placeholder="Pin"
                        />
                      </div>

                      <button
                        onClick={handleSubmit}
                        className="bg-red-500  hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2"
                      >
                        Save Changes
                      </button>
                    </form>
                  ) : (
                    <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                      <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                        <FaRegEdit />{" "}
                      </span>
                      <div className="flex gap-2">
                        <span>Shop Name : </span>
                        <span>{userInfo.shopInfo.shopName}</span>
                      </div>
                      <div className="flex gap-2">
                        <span>Address : </span>
                        <span>{userInfo.shopInfo.address} </span>
                      </div>
                      <div className="flex gap-2">
                        <span>District : </span>
                        <span>{userInfo.shopInfo.district}</span>
                      </div>
                      <div className="flex gap-2">
                        <span>State : </span>
                        <span>{userInfo.shopInfo.state}</span>
                      </div>
                      <div className="flex gap-2">
                        <span>PIN : </span>
                        <span>{userInfo.shopInfo.pin}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
