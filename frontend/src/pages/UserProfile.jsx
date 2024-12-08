import React, { useEffect, useState } from "react";
import {
  update_user_profile,
  get_user_profile,
  messageClear,
  add_address,
} from "../store/reducers/authUserReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Profile from "../componets/UserProfile/Profile";
import UserAddress from "./../componets/UserProfile/UserAddress";

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

  const [userDetails, setUserDetails] = useState({
    username: userProfileInfo?.name,
    fullName: userProfileInfo?.fullName || "No full Name Added",
    email: userProfileInfo?.email,
    phone: userProfileInfo?.phone,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    const data = {
      userId: userInfo.id,
      info: userDetails,
    };
    dispatch(update_user_profile(data));
    setIsEditing(false);
  };

  useEffect(() => {
    dispatch(get_user_profile(userInfo.id));
  }, [successMessage]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.success(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  // address management
  const [inputState, setInputState] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    district: "",
    city: "",
    area: "",
  });

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const save = (e) => {
    e.preventDefault();

    const { name, address, phone, post, district, city, area } = inputState;
    if (name && address && phone && post && district && city && area) {
      const data = {
        userId: userInfo?.id,
        info: inputState,
      };
      dispatch(add_address(data));
      setInputState({
        name: "",
        address: "",
        phone: "",
        post: "",
        district: "",
        city: "",
        area: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-14 ">
      <Profile
        toggleEdit={toggleEdit}
        saveChanges={saveChanges}
        handleInputChange={handleInputChange}
        isEditing={isEditing}
        userDetails={userDetails}
      />
      {/* address */}
      <div className="bg-white w-[90%] px-7 py-10 flex flex-col gap-10">
        <h1 className="text-2xl text-center font-bold">Address</h1>
        <div className="grid grid-cols-2 gap-8">
          <div className="pr-8">
            {addressUser.map((address) => (
              <div className="flex flex-col gap-1 bg-zinc-200 rounded-md p-3 my-3">
                <p>
                  <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
                    To
                  </span>

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

                  <span
                    onClick={() => {
                      setIsAddressEditing(true);
                      setInputState({
                        name: address?.name,
                        address: address?.address,
                        phone: address?.phone,
                        post: address?.post,
                        district: address?.district,
                        city: address?.city,
                        area: address?.area,
                      });
                    }}
                    className="text-indigo-500 cursor-pointer mx-2 px-6"
                  >
                    Change
                  </span>
                </p>
              </div>
            ))}
          </div>
          <div>
            <UserAddress
              setIsAddressEditing={setIsAddressEditing}
              save={save}
              inputHandle={inputHandle}
              inputState={inputState}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
