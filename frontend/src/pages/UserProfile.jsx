import React, { useEffect, useState } from "react";
import {
  update_user_profile,
  get_user_profile,
  messageClear,
  add_address,
  update_address,
  delete_address,
} from "../store/reducers/authUserReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Profile from "../componets/UserProfile/Profile";
import UserAddress from "./../componets/UserProfile/UserAddress";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import ConfirmModal from "./../componets/ConfirmModal";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [isAddressEditing, setIsAddressEditing] = useState(false);
  const dispatch = useDispatch();
  const {
    userProfileInfo,
    addressUser,
    userInfo,
    successMessage,
    errorMessage,
  } = useSelector((store) => store.authUser);
  const [modalClose, SetModalClose] = useState(true);

  const [userDetails, setUserDetails] = useState({
    username: userProfileInfo?.name,
    fullName: userProfileInfo?.fullName || "No full Name Added",
    email: userProfileInfo?.email,
    phone: userProfileInfo?.phone,
  });
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // user profile
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };
  // user profile
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  // user profile
  const saveChanges = () => {
    const { username, fullName, phone } = userDetails;
    if (!username.trim() || !fullName.trim() || !phone.trim()) {
      toast.error("all filed are required");
      return;
    }
    const data = {
      userId: userInfo.id,
      info: userDetails,
    };
    dispatch(update_user_profile(data));
    setIsEditing(false);
  };
  // getting profile page
  useEffect(() => {
    dispatch(get_user_profile(userInfo.id));
  }, [successMessage, dispatch, userInfo]);

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

  // address management
  const [inputState, setInputState] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    district: "",
    city: "",
    area: "",
    addressId: "",
  });

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  // for adding  and editing  address
  const saveAddress = (e) => {
    e.preventDefault();
    console.log("save");

    const { name, address, phone, post, district, city, area } = inputState;

    if (
      !name.trim() ||
      !address.trim() ||
      !phone.trim() ||
      !post.trim() ||
      !district.trim() ||
      !city.trim() ||
      !area.trim()
    ) {
      toast.error("All fields are mandatory");
      return;
    }

    if (isAddressEditing) {
      const { addressId } = inputState;
      const data = {
        info: inputState,
        addressId,
      };
      console.log(data);
      dispatch(update_address(data));
      setIsAddressEditing(false);
    } else {
      const data = {
        userId: userInfo?.id,
        info: inputState,
      };
      dispatch(add_address(data));
    }

    setInputState({
      name: "",
      address: "",
      phone: "",
      post: "",
      district: "",
      city: "",
      area: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-7 ">
      <div className="w-full">
        <Profile
          toggleEdit={toggleEdit}
          saveChanges={saveChanges}
          handleInputChange={handleInputChange}
          isEditing={isEditing}
          userDetails={userDetails}
          userProfileInfo={userProfileInfo}
        />
      </div>

      {/* address */}
      <div className="bg-white  px-7 py-10 flex flex-col gap-10 rounded-lg ">
        <h1 className="text-2xl text-center font-bold">Delivery Address</h1>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-1">
          <div className="pr-8">
            {addressUser.map((address) => (
              <div
                key={address._id}
                className="flex flex-col gap-1 bg-zinc-200 rounded-md p-3 my-3"
              >
                <div>
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
                      To
                    </span>
                    <div className="flex text-xl gap-2  ">
                      <span
                        onClick={() => {
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
                          setIsAddressEditing(true);
                        }}
                        className=" cursor-pointer mx-2 "
                      >
                        <FaEdit />
                      </span>
                      <span
                        onClick={() => {
                          setSelectedAddressId(address._id);
                          SetModalClose(false);
                          console.log(address._id);
                        }}
                        className=" cursor-pointer"
                      >
                        <MdDelete />
                      </span>
                      {!modalClose && (
                        <ConfirmModal
                          message="do you want to delete this address"
                          SetModalClose={SetModalClose}
                          confimFunction={() =>
                            dispatch(delete_address(selectedAddressId))
                          }
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col px-8">
                    <span className="lowercase">
                      {address?.name},{address?.address},
                    </span>
                    <span>
                      {address?.area},{address?.district},
                    </span>
                    <span>
                      {address?.city},{address?.post}
                    </span>
                    <span>{address?.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <UserAddress
              isAddressEditing={isAddressEditing}
              setIsAddressEditing={setIsAddressEditing}
              saveAddress={saveAddress}
              inputHandle={inputHandle}
              inputState={inputState}
              setInputState={setInputState}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
