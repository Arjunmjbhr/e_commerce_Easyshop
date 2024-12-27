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
  const dispatch = useDispatch();
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
    offerPercentage: 0,
    startingDate: "",
    expirationDate: "",
    isActive: true,
  });

  const handleEdit = (offer) => {
    setForm({
      offerCategory: offer.offerCategory,
      offerPercentage: offer.offerPercentage,
      offerId: offer._id,
      startingDate: offer?.startingDate
        ? new Date(offer.startingDate).toISOString().split("T")[0]
        : "",
      expirationDate: offer?.expirationDate
        ? new Date(offer.expirationDate).toISOString().split("T")[0]
        : "",
      isActive: offer?.isActive,
    });
    setIsEdit(true);
    setIsModalOpen(true);
  };
  const handleDelete = (offerId) => {
    dispatch(delete_category_offer(offerId));
  };

  useEffect(() => {
    dispatch(get_category_offer({ searchValue, perPage, page: currentPage }));
    dispatch(get_category({ perPage: 10, page: 1, searchValue }));
  }, [dispatch, searchValue, perPage, currentPage, successMessage]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setIsModalOpen(false);
      setIsEdit(false);
      setForm({
        offerCategory: "",
        offerPercentage: 0,
        startingDate: "",
        expirationDate: "",

        isActive: true,
      });
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
            {categoryOffer.map((offer) => {
              const {
                _id,
                offerCategory,
                offerPercentage,
                startingDate,
                expirationDate,
                isActive,
              } = offer;

              return (
                <div
                  key={_id}
                  className={`${
                    isActive ? "bg-green-100" : "bg-red-100"
                  } font-semibold `}
                >
                  <div className="  p-2 my-2 flex">
                    <div className=" text-black text-sm w-[25%] ">{_id}</div>
                    <div className=" text-black text-sm w-[17%] text-center  ">
                      {offerPercentage} %
                    </div>
                    <div className=" text-black text-sm w-[17%]  ">
                      {offerCategory}
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
                      <span onClick={() => handleEdit(offer)}>
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
                        confimFunction={() => handleDelete(_id)}
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
