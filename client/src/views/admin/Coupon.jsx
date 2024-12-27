import React, { useState, useEffect } from "react";
import Search from "../../components/Search";
import Pagination from "./../Pagination";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import AddCouponModal from "./componets/AddCouponModal";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  messageClear,
  get_coupon,
  delete_coupon,
} from "../../store/Reducers/couponReducer";
import ConfirmModal from "./../../components/ConfirmModal";

const Coupon = () => {
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalClose, setModalClose] = useState(true);
  const { successMessage, errorMessage, coupons, totalCoupons } = useSelector(
    (store) => store.coupon
  );
  // State to store form inputs
  const [form, setForm] = useState({
    couponId: "",
    discountAmount: "",
    minOrderValue: "",
    startingDate: "",
    expirationDate: "",
    totalRedemptionsAllowed: "",
    isActive: true,
  });

  const handleEdit = (coupon) => {
    setForm({
      couponId: coupon?.couponId || "",
      discountAmount: coupon?.discountAmount || "",
      minOrderValue: coupon?.minOrderValue || "",
      startingDate: coupon?.startingDate
        ? new Date(coupon.startingDate).toISOString().split("T")[0]
        : "",
      expirationDate: coupon?.expirationDate
        ? new Date(coupon.expirationDate).toISOString().split("T")[0]
        : "",
      totalRedemptionsAllowed: coupon?.totalRedemptionsAllowed || "",
      isActive: coupon?.isActive,
    });
    setIsEdit(true);
    setIsModalOpen(true);
  };
  const handleDelete = (couponId) => {
    dispatch(delete_coupon(couponId));
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_coupon({ searchValue, perPage, page: currentPage }));
  }, [dispatch, form, searchValue, perPage, currentPage, successMessage]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div className="px-2 md:pr-7">
      <div className=" mx-3">
        <div className="flex justify-end ">
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-green-400 gap-2 px-3 py-2 rounded-md cursor-pointer "
          >
            <h4>Add New Coupon</h4>
            <span>
              <IoMdAddCircle />
            </span>
          </div>
          <div>
            {isModalOpen && (
              <AddCouponModal
                isOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                setForm={setForm}
                form={form}
              />
            )}
          </div>
        </div>
      </div>
      <div className="w-full p-4">
        {/* header of order list */}
        <div>
          {/* Table Header */}
          <Search
            setPerPage={setPerPage}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
        {/* content of order table*/}
        <div className="relative overflow-x-auto">
          <div>
            {/* table heading */}
            <div className=" bg-slate-600 p-2 flex">
              <div className="font-bold uppercase text-white text-sm w-[17%]  ">
                Coupon Id
              </div>
              <div className="font-bold uppercase text-white text-sm w-[10%]  ">
                discount<br></br>Amount
              </div>
              <div className="font-bold uppercase text-white text-sm w-[10%]  ">
                min Order<br></br> Value
              </div>
              <div className="font-bold uppercase text-white text-sm w-[15%]  ">
                starting <br></br> Date
              </div>
              <div className="font-bold uppercase text-white text-sm w-[15%]  ">
                expiration <br></br> Date
              </div>
              <div className="font-bold uppercase text-white text-sm w-[15%] ">
                total Redemptions <br></br> Allowed
              </div>
              <div className="font-bold uppercase text-white text-sm w-[15%] ">
                redemptions Count
              </div>
              <div className="font-bold uppercase text-white text-sm w-[8%] ">
                Action
              </div>
            </div>
            {/* table content */}
            {coupons.map((coupon) => {
              const {
                couponId,
                discountAmount,
                minOrderValue,
                startingDate,
                expirationDate,
                totalRedemptionsAllowed,
                isActive,
                redemptionsCount,
              } = coupon;

              return (
                <div
                  className={`${
                    isActive ? "bg-green-100" : "bg-red-100"
                  } font-semibold `}
                >
                  <div className="  p-2 my-2 flex">
                    <div className=" text-black text-sm w-[17%] ">
                      {couponId}
                    </div>
                    <div className=" text-black text-sm w-[10%]  ">
                      {discountAmount}
                    </div>
                    <div className=" text-black text-sm w-[10%]  ">
                      {minOrderValue}
                    </div>
                    <div className="  text-black text-sm w-[15%]  ">
                      {new Date(startingDate).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <div className="  text-black text-sm w-[15%]  ">
                      {new Date(expirationDate).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <div className=" text-black text-sm w-[15%] ">
                      {totalRedemptionsAllowed}
                    </div>
                    <div className=" text-black text-sm w-[15%] ">
                      {redemptionsCount}
                    </div>

                    <div className=" flex gap-3 text-black text-lg w-[8%] cursor-pointer  ">
                      <span onClick={() => handleEdit(coupon)}>
                        <FaEdit />
                      </span>
                      <span
                        onClick={() => {
                          setModalClose(false);
                        }}
                      >
                        <MdDeleteForever />
                      </span>
                    </div>
                  </div>
                  <div>
                    {!modalClose && (
                      <ConfirmModal
                        SetModalClose={setModalClose}
                        confimFunction={() => handleDelete(couponId)}
                        message="Are you sure want to delete the coupon"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* pagination */}
        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={totalCoupons}
            perPage={perPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default Coupon;
