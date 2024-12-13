import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  add_category_offer,
  update_category_offer,
} from "../../../store/Reducers/categoryReducer";

import toast from "react-hot-toast";
import { categoryOfferValidation } from "../../../utils/categoryOfferValidation";

const AddEditOfferModal = ({
  isOpen,
  setIsModalOpen,
  isEdit,
  setIsEdit,
  form,
  setForm,
  categories,
}) => {
  const dispatch = useDispatch();
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    const errors = categoryOfferValidation(
      form.offerPercentage,
      form.startingDate,
      form.expirationDate,
      form.offerCategory
    );
    if (Object.values(errors).length > 0) {
      for (let error of Object.values(errors)) {
        toast.error(error);
      }
      return null;
    }

    if (isEdit) {
      const data = {
        offerId: form.offerId,
        info: {
          offerCategory: form.offerCategory,
          offerPercentage: form.offerPercentage,
          startingDate: form.startingDate,
          expirationDate: form.expirationDate,
          isActive: form.isActive,
        },
      };
      console.log(data);
      dispatch(update_category_offer(data));
    } else {
      dispatch(add_category_offer(form));
    }
  };

  const onClose = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    setForm({
      offerCategory: "",
      offerPercentage: 0,
      startingDate: "",
      expirationDate: "",

      isActive: true,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`rounded-lg shadow-lg w-11/12 max-w-lg ${
          isEdit ? "bg-stone-300" : "bg-green-300"
        }`}
      >
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold text-center">
            {isEdit ? "Edit Offer" : "Add New Offer"}
          </h2>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex justify-between gap-3">
            {/* Discount Amount */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Offer Category
              </label>
              <select
                disabled={isEdit}
                name="offerCategory"
                value={form.offerCategory}
                onChange={handleChange}
                className="mt-1 block w-full px-2 py-1 outline-none border-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select category</option>
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.id} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))
                ) : (
                  <option disabled>No categories available</option>
                )}
              </select>
            </div>

            {/* Minimum Order Value */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                offer Percentage
              </label>
              <input
                type="number"
                name="offerPercentage"
                value={form.offerPercentage}
                onChange={handleChange}
                className="mt-1 block w-full px-2 py-1 outline-none  border-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-between gap-3">
            {/* Expiration Date */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Starting Date
              </label>
              <input
                type="date"
                name="startingDate"
                value={form.startingDate}
                onChange={handleChange}
                className="mt-1 block w-full border-2 px-2 py-1 outline-none  rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            {/* Expiration Date */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Expiration Date
              </label>
              <input
                type="date"
                name="expirationDate"
                value={form.expirationDate}
                onChange={handleChange}
                className="mt-1 block w-full px-2 py-1 outline-none  border-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>

          {/* Is Active */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600   border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">
              Active
            </label>
          </div>
        </div>
        <div className="p-4 border-t flex justify-end space-x-2">
          <button
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={handleSubmit}
          >
            {isEdit ? "Save Changes" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditOfferModal;
