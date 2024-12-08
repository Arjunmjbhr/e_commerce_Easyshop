import React from "react";
import { useState, useEffect } from "react";
import Pagination from "./../Pagination";
import Search from "../../components/Search";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { get_seller_orders } from "../../store/Reducers/orderReducer";

const SellerOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState("");
  const dispatch = useDispatch();
  const { myOrders, totalOrder } = useSelector((store) => store.order);
  const { userInfo } = useSelector((store) => store.auth);

  useEffect(() => {
    const data = {
      searchValue,
      page: currentPage,
      perPage,
      sellerId: userInfo._id,
    };
    dispatch(get_seller_orders(data));
  }, [currentPage, searchValue, perPage, dispatch]);
  return (
    <div className="px-2 md:pr-7">
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
              <div className="font-bold uppercase text-white text-sm w-[25%] ">
                Order Id
              </div>
              <div className="font-bold uppercase text-white text-sm w-[13%]  ">
                Price
              </div>
              <div className="font-bold uppercase text-white text-sm w-[25%]  ">
                Date
              </div>
              <div className="font-bold uppercase text-white text-sm w-[15%]  ">
                Payment Status
              </div>
              <div className="font-bold uppercase text-white text-sm w-[15%] ">
                order status
              </div>
              <div className="font-bold uppercase text-white text-sm w-[8%] ">
                Action
              </div>
            </div>
            {/* table content */}
            {myOrders.map((product) => (
              <div className="bg-white ">
                <div className="  p-2 my-2 flex">
                  <div className=" text-black text-sm w-[25%] ">
                    {product._id}
                  </div>
                  <div className=" text-black text-sm w-[13%]  ">
                    {product.price}
                  </div>
                  <div className=" text-black text-sm w-[25%]  ">
                    {product.date}
                  </div>
                  <div className="  text-black text-sm w-[15%]  ">
                    {product.payment_status}
                  </div>
                  <div className=" text-black text-sm w-[15%] ">
                    {product.delivery_status}
                  </div>

                  <div className=" text-black text-lg w-[7%] cursor-pointer  ">
                    <Link to={`/seller/dashboard/order/details/${product._id}`}>
                      <FaRegEdit />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* pagination */}
        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={totalOrder}
            perPage={perPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;
