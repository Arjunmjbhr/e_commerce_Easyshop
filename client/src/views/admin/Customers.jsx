import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { TbLockOpen2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  get_customer,
  block_unblock_customer,
  messageClear,
} from "../../store/Reducers/customerAdminReducer";
import { TbLockFilled } from "react-icons/tb";
import { toast } from "react-hot-toast";
import ConfirmModal from "./../../components/ConfirmModal";

const Customers = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [modalClose, setModalClose] = useState(true);
  const [blockItem, setblockItem] = useState("");

  const dispatch = useDispatch();
  const { successMessage, errorMessage, loader, customers, totalCustomers } =
    useSelector((store) => store.customer);

  //get details of customer
  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };

    dispatch(get_customer(obj));
  }, [perPage, currentPage, searchValue, dispatch]);

  //block customer
  const handleBlock = () => {
    const customerId = blockItem._id;
    dispatch(block_unblock_customer(customerId));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.success(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div className="px-2 lg:pr-7">
      {/* Sellers List Section */}
      <div className="w-full  bg-white shadow-md rounded-md">
        {/* Table Header */}
        <div className="h-14 bg-slate-600 rounded-t-md flex justify-between items-center px-4">
          <select
            onChange={(e) => setPerPage(parseInt(e.target.value))}
            className="px-3 py-2 rounded font-semibold"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="hidden md:block bg-white border border-gray-300 h-10 px-3 py-1 rounded focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search"
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
                <th className="border border-gray-300 px-4 py-2">Email Id</th>
                <th className="border border-gray-300 px-4 py-2">Method</th>

                <th className="border border-gray-300 px-4 py-2">
                  Block/UnBlock
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-100 h-[60px] border-t text-sm"
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={
                        item?.image || `http://localhost:3001/images/user.png`
                      }
                      alt={item.name}
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.method}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex justify-center gap-3">
                      <div
                        onClick={() => {
                          setblockItem(item);
                          setModalClose(false);
                        }}
                        className="px-3 py-2 rounded-full hover:bg-blue-200 text-lg"
                      >
                        {item.isBlocked ? <TbLockFilled /> : <TbLockOpen2 />}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* confirmation modal */}
          {!modalClose && (
            <div>
              <ConfirmModal
                message="Are you sure want block user"
                SetModalClose={setModalClose}
                confimFunction={handleBlock}
              />
            </div>
          )}
          {/* pagination */}
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalCustomers}
              perPage={perPage}
              showItem={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
