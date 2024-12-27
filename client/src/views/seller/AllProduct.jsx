import React, { useEffect, useState } from "react";
import Search from "../../components/Search";
import { Link } from "react-router-dom";
import { LiaEditSolid } from "react-icons/lia";
import { MdAutoDelete } from "react-icons/md";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  get_product,
  delete_product,
  messageClear,
} from "../../store/Reducers/productReducer";
import ConfirmModal from "../../components/ConfirmModal";

const AllProduct = () => {
  const [perPage, setPerPage] = useState("5");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState("1");
  const dispatch = useDispatch();
  const { totalProduct, products, successMessage, errorMessage } = useSelector(
    (store) => store.product
  );
  const [modalClose, setModalClose] = useState(true);
  const [deleteItem, setDeleteItem] = useState("");

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      searchValue,
      page: parseInt(currentPage),
    };
    console.log(obj);
    dispatch(get_product(obj));
  }, [searchValue, currentPage, perPage, dispatch]);

  const handleDelete = () => {
    dispatch(delete_product(deleteItem));
  };

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

  return (
    <div className="px-2 md:pr-7 pb-4">
      <div>
        {/* Category List Section */}
        <div className="w-full  bg-white shadow-md rounded-md">
          {/* Table Header */}
          <Search
            setPerPage={setPerPage}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          {/* Table Body */}
          <div className="p-4">
            <table className="table-auto w-full text-center border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">No</th>
                  <th className="border border-gray-300 px-4 py-2">Image</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Product Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Category</th>
                  <th className="border border-gray-300 px-4 py-2">Brand</th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Discount</th>
                  <th className="border border-gray-300 px-4 py-2">Stock</th>
                  <th className="border border-gray-300 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-100 h-[60px] border-t"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.category}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.brand}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.discount === 0
                        ? "No discount"
                        : `${item.discount} %`}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.stock}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="flex justify-center gap-3">
                        <Link
                          to={`/seller/dashboard/edit-product/${item._id}`}
                          className="px-3 py-2 rounded-full hover:bg-blue-200 text-lg"
                        >
                          <LiaEditSolid />
                        </Link>

                        <div
                          onClick={() => {
                            setDeleteItem(item._id);
                            setModalClose(false);
                          }}
                          className="px-3 py-2 rounded-full cursor-pointer hover:bg-blue-200 text-lg"
                        >
                          <MdAutoDelete />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* confirm modal */}
            {!modalClose && (
              <div>
                <ConfirmModal
                  message="Are you sure want to delete the Product"
                  SetModalClose={setModalClose}
                  confimFunction={handleDelete}
                />
              </div>
            )}
            {/* pagination */}
            <div className="w-full flex justify-end mt-4 bottom-4 right-4">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={totalProduct}
                perPage={perPage}
                showItem={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
