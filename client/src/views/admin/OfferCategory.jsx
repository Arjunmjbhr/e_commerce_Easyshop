import React, { useState, useEffect } from "react";
import Search from "../../components/Search";
import Pagination from "./../Pagination";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  messageClear,
  get_category_offer,
  delete_category_offer,
  get_category,
} from "../../store/Reducers/categoryReducer";
import ConfirmModal from "./../../components/ConfirmModal";
import AddEditOfferModal from "./componets/AddEditOfferModal";

const OfferCategory = () => {
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalClose, setModalClose] = useState(true);
  const {
    successMessage,
    errorMessage,
    categoryOffer,
    categories,
    totalOffer,
  } = useSelector((store) => store.category);
  // State to store form inputs
  const [form, setForm] = useState({
    offerCategory: "",
    offerPercetage: 0,
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
    dispatch(delete_category_offer(couponId));
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_category_offer({ searchValue, perPage, page: currentPage }));
    dispatch(get_category({ perPage: 10, page: 1, searchValue }));
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

  const offers = [
    {
      offerId: 557556,
      startingDate: "2024-12-15", // YYYY-MM-DD format
      category: "Electronics",
      expirationDate: "2024-12-31",
      isActive: true,
    },
    {
      offerId: 557557,
      startingDate: "2024-12-10",
      category: "Fashion",
      expirationDate: "2024-12-25",
      isActive: false,
    },
    {
      offerId: 557558,
      startingDate: "2024-12-20",
      category: "Home Appliances",
      expirationDate: "2025-01-10",
      isActive: true,
    },
    {
      offerId: 557559,
      startingDate: "2024-11-30",
      category: "Books",
      expirationDate: "2024-12-15",
      isActive: false,
    },
    {
      offerId: 557560,
      startingDate: "2024-12-01",
      category: "Groceries",
      expirationDate: "2024-12-20",
      isActive: true,
    },
  ];

  return (
    <div className="px-2 md:pr-7">
      <div className=" mx-3">
        <div className="flex justify-end ">
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-green-400 gap-2 px-3 py-2 rounded-md cursor-pointer "
          >
            <h4>Add New Offer</h4>
            <span>
              <IoMdAddCircle />
            </span>
          </div>
          <div>
            {isModalOpen && (
              <AddEditOfferModal
                categories={categories}
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
              <div className="font-bold uppercase text-white text-sm w-[25%]  ">
                offer Id
              </div>
              <div className="font-bold uppercase text-white text-sm w-[17%]  ">
                Offer Percentage
              </div>
              <div className="font-bold uppercase text-white text-sm w-[17%]  ">
                Category
              </div>
              <div className="font-bold uppercase text-white text-sm w-[17%]  ">
                starting Date
              </div>
              <div className="font-bold uppercase text-white text-sm w-[17%]  ">
                expiration Date
              </div>

              <div className="font-bold uppercase text-white text-sm w-[12%] ">
                Action
              </div>
            </div>
            {/* table content */}
            {offers.map((offer) => {
              const {
                offerId,
                startingDate,
                category,
                expirationDate,
                isActive,
              } = offer;

              return (
                <div
                  className={`${
                    isActive ? "bg-green-500" : "bg-red-500"
                  } font-semibold `}
                >
                  <div className="  p-2 my-2 flex">
                    <div className=" text-black text-sm w-[25%] ">
                      {offerId}
                    </div>
                    <div className=" text-black text-sm w-[17%]  ">
                      offer percentage
                    </div>
                    <div className=" text-black text-sm w-[17%]  ">
                      {category}
                    </div>

                    <div className="  text-black text-sm w-[17%]  ">
                      {new Date(startingDate).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <div className="  text-black text-sm w-[17%]  ">
                      {new Date(expirationDate).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>

                    <div className=" flex gap-3 text-black text-lg w-[12%] cursor-pointer  ">
                      <span onClick={() => handleEdit(offerId)}>
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
                        confimFunction={() => handleDelete(offerId)}
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
            totalItem={totalOffer}
            perPage={perPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default OfferCategory;
