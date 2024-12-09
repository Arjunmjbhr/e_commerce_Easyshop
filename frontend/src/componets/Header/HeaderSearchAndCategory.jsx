import React from "react";
import { Link } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
const HeaderSearchAndCategory = ({
  setShowCategory,
  showCategory,
  categories,
  setCategory,
  searchValue,
  setSearchValue,
  search,
}) => {
  return (
    <div>
      <div className="flex flex-wrap md-lg:gap-8 justify-center">
        {/* category list icon */}
        <div className="w-3/12 md-lg:w-full">
          <div className="bg-white relative">
            {/* category button */}
            <div
              onClick={() => setShowCategory(!showCategory)}
              className={`h-[50px] bg-green-700  flex justify-center items-center cursor-pointer ${
                showCategory ? `rounded-t-md` : `rounded-md`
              }`}
            >
              <div className="flex justify-center items-center text-white gap-5 font-semibold ">
                <span>
                  <FaList />
                </span>
                <span>All Category</span>
                <span>
                  <FaChevronDown />
                </span>
              </div>
            </div>
            {/*  category list  */}
            <div
              className={`bg-green-300 absolute w-full  md-lg:relative transition-all duration-500 overflow-hidden z-[9999]  ${
                showCategory ? "h-auto rounded-b-md" : "h-0"
              }`}
            >
              <ul className="flex flex-col justify-center items-center gap-4 mt-3 mx-3  ">
                {categories.map((item) => {
                  return (
                    <li
                      key={item._id}
                      className="font-semibold hover:bg-white w-full py-2 flex justify-start cursor-pointer"
                    >
                      <img
                        src={item.image}
                        className="w-[30px] h-[30px] rounded-full overflow-hidden mx-5"
                        alt=""
                      />
                      <Link to={`/products?category=${item.categoryName}`}>
                        {item.categoryName}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        {/* search feature */}
        <div className="w-6/12 md-lg:w-full mx-3 ">
          <div className="flex  border-2 py-2 h-[50px] justify-start items-center gap-2">
            {/* select category */}
            <div className="px-2 w-3/12 md:hidden">
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="px-2 py-1"
              >
                <option value="">Select Category</option>
                {categories.map((item) => (
                  <option key={item._id} value={item.categoryName}>
                    {item.categoryName}
                  </option>
                ))}
              </select>
            </div>
            {/* search input */}
            <div className="pl-4 w-9/12 flex  justify-between items-center md:w-full">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-5 outline-none"
                type="text"
                placeholder="What do you need?"
              />
              {/* search button */}
              <button
                onClick={search}
                className="bg-green-700 py-3 px-3 text-white font-semibold uppercase"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSearchAndCategory;