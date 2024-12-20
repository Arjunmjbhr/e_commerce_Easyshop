import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  get_specific_seller_details,
  messageClear,
  update_seller_active_deactive,
} from "../../store/Reducers/sellerReducer";
import ConfirmModal from "./../../components/ConfirmModal";
import toast from "react-hot-toast";

const SellerDetails = () => {
  const dispatch = useDispatch();
  const { sellerId } = useParams();
  const { specificSeller, loading, successMessage, errorMessage } = useSelector(
    (store) => store.seller
  );
  const [option, setOption] = useState("");
  const [modalClose, setModalClose] = useState(true);

  useEffect(() => {
    dispatch(get_specific_seller_details(sellerId));
  }, [dispatch, sellerId, successMessage]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.success(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage, dispatch]);

  if (loading || !specificSeller) {
    return <div>Loading...</div>;
  }

  const { username, email, status, payment, image, shopInfo } = specificSeller;

  const handleSubmit = () => {
    if (!option.trim()) {
      toast.error("select option");
      return;
    }
    dispatch(
      update_seller_active_deactive({ sellerId, info: { status: option } })
    );
  };

  return (
    <div className="px-2 lg:mr-7">
      <div className="my-3">
        <h1 className="text-xl font-bold">Seller Details</h1>
      </div>
      <div className="flex flex-wrap rounded-xl gap-3 bg-slate-600 p-4 text-white justify-center">
        {/* Profile Picture */}
        <div className="w-full sm:w-6/12 md:w-3/12 lg:w-3/12 flex flex-col justify-center items-center">
          {image ? (
            <div className="w-[100px] h-[100px] rounded-full  bg-slate-50">
              <img
                className="object-fill w-[100px] h-[100px] rounded-full"
                src={image}
                alt="Seller"
              />
            </div>
          ) : (
            <div className="w-[100px] h-[100px] rounded-full bg-slate-50"></div>
          )}
          <div className="text-black mt-3">
            <select
              onChange={(e) => setOption(e.target.value)}
              name="status"
              className="px-2 py-1 rounded-lg"
            >
              <option value="">--Select--</option>
              <option value="active">Activate</option>
              <option value="deactive">Deactivate</option>
            </select>
            <button
              onClick={() => setModalClose(false)}
              className="mx-2 px-2 py-1 bg-red-600 rounded-md text-white"
            >
              Submit
            </button>
          </div>
          {!modalClose && (
            <ConfirmModal
              message="Are you sure want to change the status of seller"
              SetModalClose={setModalClose}
              confimFunction={handleSubmit}
            />
          )}
        </div>
        {/* General Information */}
        <div className="w-full sm:w-8/12 md:w-4/12 flex flex-col gap-2">
          <div className="font-bold">General Information</div>
          <div className="bg-white w-full text-black p-3 rounded-lg font-semibold flex flex-col gap-2">
            <div>
              <span>Name: </span>
              <span>{username}</span>
            </div>
            <div>
              <span>Email: </span>
              <span>{email}</span>
            </div>
            <div>
              <span>Account Status: </span>
              <span>{status}</span>
            </div>
            <div>
              <span>Payment Status: </span>
              <span>{payment}</span>
            </div>
          </div>
        </div>
        {/* Address */}
        <div className="w-full sm:w-8/12 md:w-4/12 flex flex-col gap-2">
          <div className="font-bold">Shop Details</div>
          <div className="bg-white w-full text-black p-3 rounded-lg font-semibold flex flex-col gap-2">
            <div>
              <span>Shop Name: </span>
              <span>{shopInfo?.shopName}</span>
            </div>
            <div>
              <span>Address: </span>
              <span>{shopInfo?.address}</span>
            </div>
            <div>
              <span>District: </span>
              <span>{shopInfo?.district}</span>
            </div>
            <div className="flex gap-3">
              <div>
                <span>State: </span>
                <span>{shopInfo?.state}</span>
              </div>
              <div>
                <span>PIN: </span>
                <span>{shopInfo?.pin}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
