import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/Search";
import { get_seller_request } from "../../store/Reducers/sellerReducer";

const Sellers = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const dispatch = useDispatch();
  const { sellers, totalSeller } = useSelector((store) => store.seller);

  useEffect(() => {
    dispatch(get_seller_request({ perPage, searchValue, page: currentPage }));
  }, [dispatch, searchValue, perPage, currentPage]);

  if (!sellers) {
    return <div>Loading...</div>;
  }
  return (
    <div className="px-2 lg:pr-7">
      {/* Sellers List Section */}
      <div className="w-full  bg-white shadow-md rounded-md">
        {/* Table Header */}
        <div>
          <Search
            setSearchValue={setSearchValue}
            searchValue={searchValue}
            setPerPage={setPerPage}
          />
        </div>
        {/* Table Body */}
        <div className="p-4">
          <table className="table-auto w-full text-center border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">No</th>
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Shop Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Account status
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Payment Status
                </th>
                <th className="border border-gray-300 px-4 py-2">Email</th>

                <th className="border border-gray-300 px-4 py-2">View</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((item, index) => {
                const {
                  _id,
                  username,
                  email,
                  status,
                  payment,
                  image,
                  shopInfo,
                } = item;

                return (
                  <tr
                    key={_id}
                    className="hover:bg-gray-100 h-[60px] border-t text-sm"
                  >
                    <td className="border  border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        src={image}
                        alt={username}
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-black">
                      {username}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {shopInfo?.shopName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {payment}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {email}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex justify-center gap-3">
                        <Link
                          to={`/admin/dashboard/sellers/details/${_id}`}
                          className="px-3 py-2 rounded-full hover:bg-blue-200 text-lg"
                        >
                          <FaEye />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* pagination */}
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalSeller}
              perPage={perPage}
              showItem={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sellers;
