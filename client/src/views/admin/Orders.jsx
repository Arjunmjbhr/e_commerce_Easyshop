import React, { useEffect, useState } from "react";
import { CiCircleChevDown } from "react-icons/ci";
import Pagination from "./../Pagination";
import Search from "../../components/Search";
import { get_admin_orders } from "../../store/Reducers/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState("");
  const dispatch = useDispatch();
  const { myOrders, totalOrder } = useSelector((store) => store.order);

  useEffect(() => {
    const data = {
      searchValue,
      page: currentPage,
      perPage,
    };
    dispatch(get_admin_orders(data));
  }, [currentPage, searchValue, perPage, dispatch]);

  return (
    <div className="px-2 md:pr-7">
      <div className="w-full p-4">
        {/* header of order list */}
        <Search
          setPerPage={setPerPage}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
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
              <div className="font-bold uppercase text-white text-sm w-[18%]  ">
                Payment Status
              </div>
              <div className="font-bold uppercase text-white text-sm w-[18%] ">
                order status
              </div>
              <div className="font-bold uppercase text-white text-sm w-[18%] ">
                Action
              </div>
              <div
                onClick={() => setShow("")}
                className="font-bold uppercase text-white text-lg w-[8%] cursor-pointer  "
              >
                <CiCircleChevDown />
              </div>
            </div>
            {/* table content */}
            {myOrders.map((product) => (
              <div className="bg-white">
                <div className="  p-2 my-2 flex">
                  <div className=" text-black text-sm w-[25%] ">
                    {product._id}
                  </div>
                  <div className=" text-black text-sm w-[13%]  ">
                    {product.price}
                  </div>
                  <div className="  text-black text-sm w-[18%]  ">
                    {product.payment_status}
                  </div>
                  <div className=" text-black text-sm w-[18%] ">
                    {product.delivery_status}
                  </div>
                  <div className=" text-black text-sm w-[18%] ">
                    <Link to={`/admin/dashboard/order/details/${product._id}`}>
                      <FaRegEdit />
                    </Link>
                  </div>
                  <div
                    className=" text-black text-lg w-[8%] cursor-pointer  "
                    onClick={() => setShow(product._id)}
                  >
                    <CiCircleChevDown />
                  </div>
                </div>
                {/* other orders along with main order */}
                {product?.suborders.map((subOrd) => (
                  <div
                    className={`${
                      show === product._id ? "block" : "hidden"
                    }  p-2  flex bg-zinc-200`}
                  >
                    <div className=" text-black text-sm w-[25%] ">
                      {subOrd._id}
                    </div>
                    <div className=" text-black text-sm w-[13%]  ">
                      {subOrd.price}
                    </div>
                    <div className="  text-black text-sm w-[18%]  ">
                      {subOrd.payment_status}
                    </div>
                    <div className=" text-black text-sm w-[18%] ">
                      {subOrd.delivery_status}
                    </div>
                  </div>
                ))}
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

export default Orders;
