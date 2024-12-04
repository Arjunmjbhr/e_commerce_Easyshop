import React, { useState, useEffect } from "react";
import Header from "../componets/Header";
import Footer from "../componets/Footer";
import Products from "../componets/products/Products";
import { BsGridFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import ShopProducts from "../componets/products/ShopProducts";
import Pagination from "../componets/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  get_products,
  price_range_product,
  query_proudcts,
} from "../store/reducers/homeReducer";
import PageHeading from "../componets/PageHeading";
import PriceRange from "../componets/shops/PriceRange";
import FilterRating from "../componets/shops/FilterRating";

const Shops = () => {
  const [filter, setFilter] = useState(true);
  const [rating, setRating] = useState("");
  const [styles, setStyles] = useState("grid");
  const [perPage, setPerPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const {
    categories,
    products,
    latest_product,
    priceRange = { low: 0, high: 100 },
  } = useSelector((store) => store.home);
  const [state, setState] = useState({
    values: priceRange ? [priceRange.low, priceRange.high] : [0, 100],
  });
  const [sortPrice, setSortPrice] = useState();
  // setting check box single selection
  const [category, setCategory] = useState("");
  const queryCategory = (e, value) => {
    if (e.target.checked) {
      setCategory(value);
    } else {
      setCategory("");
    }
  };

  // useEffect
  useEffect(() => {
    dispatch(get_products());
    dispatch(price_range_product());
  }, []);

  useEffect(() => {
    setState({
      values: [priceRange.low, priceRange.high],
    });
  }, [priceRange]);
  useEffect(() => {
    const query = {
      low: state.values[0],
      high: state.values[1],
      category,
      rating,
      sortPrice,
      pageNumber,
    };
    dispatch(query_proudcts(query));
  }, [
    state.values[0],
    state.values[1],
    category,
    rating,
    sortPrice,
    pageNumber,
  ]);
  console.log(category);
  console.log(rating);

  return (
    <div className=" ">
      <Header />

      {/* page Heading  */}
      <div>
        <PageHeading
          heading="Shop your Dream Products"
          breadcrumbs={{
            Home: "/",
            Product: "/shops",
          }}
        />
      </div>
      {/* filter layout and product side layout */}
      <section className="py-16  overflow-x-hidden ">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          {/* button for filter in the medium screen responsive */}
          <div className={` md:block hidden ${!filter ? "mb-6" : "mb-0"} `}>
            <button
              onClick={() => setFilter(!filter)}
              className="text-center w-full py-2 px-3 bg-indigo-500 text-white"
            >
              Filter Product
            </button>
          </div>
          {/* shop page sidebar and product layout*/}
          <div className="w-full flex flex-wrap ">
            {/* responsive hidden sidebar layout */}
            <div
              className={`w-3/12 md-lg:w-4/12 md:w-full pr-8  ${
                filter
                  ? "md:h-0 md:overflow-hidden md:mb-6"
                  : "md:h-auto md:overflow-auto md:mb-0"
              } `}
            >
              {/* category */}
              <div>
                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                  Category
                </h2>
                <div className="py-2">
                  {categories.map((c, i) => (
                    <div
                      key={c._id}
                      className="flex justify-start items-center gap-2 py-1"
                    >
                      <input
                        checked={category === c.categoryName ? true : false}
                        onChange={(e) => queryCategory(e, c.categoryName)}
                        type="checkbox"
                        id={c.categoryName}
                      />
                      <label
                        className="text-slate-600 block cursor-pointer"
                        htmlFor={c.categoryName}
                      >
                        {c.categoryName}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* price range */}
              <div className="mb-5">
                <PriceRange
                  state={state}
                  setState={setState}
                  priceRange={priceRange}
                />
              </div>
              {/* rating */}
              <div className="mb-5">
                <FilterRating setRating={setRating} />
              </div>
              {/* latest product  */}
              <div className="mb-5">
                {latest_product && (
                  <Products title="Latest Products" products={latest_product} />
                )}
              </div>
            </div>
            {/* product side layout */}
            <div className="w-9/12 md-lg:w-8/12 md:w-full  ">
              {/* sorting and view change feature */}
              <div className="mb-7">
                <div className="border-[1px] border-slate-500 flex justify-between items-center px-3 py-2 ">
                  <div>15 Products Available</div>
                  <div className="flex justify-center items-center gap-4">
                    {/* sort option */}
                    <div>
                      <select
                        className="outline-none border-2 px-2"
                        onChange={(e) => setSortPrice(e.target.value)}
                      >
                        <option>--Sort By--</option>
                        <option value="high-to-low">Higher to Lower</option>
                        <option value="low-to-high">Lower to Higher</option>
                      </select>
                    </div>
                    {/* grid view */}
                    <div
                      onClick={() => setStyles("grid")}
                      className={`cursor-pointer text-xl ${
                        styles === "grid" ? "bg-slate-800 text-white" : ""
                      } h-[35px] w-[35px] rounded-full flex justify-center items-center`}
                    >
                      <BsGridFill />
                    </div>
                    {/* list view */}
                    <div
                      onClick={() => setStyles("list")}
                      className={`cursor-pointer text-xl ${
                        styles === "list" ? "bg-slate-800 text-white" : ""
                      } h-[35px] w-[35px] rounded-full flex justify-center items-center`}
                    >
                      <FaListUl />
                    </div>
                  </div>
                </div>
              </div>
              {/* product list */}
              <div className="">
                <ShopProducts styles={styles} products={products} />
              </div>
              {/* pagination */}
              <div className="w-full flex justify-end mt-4 pr-7 overflow-x-hidden">
                <Pagination
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                  totalItem={10}
                  perPage={perPage}
                  showItem={Math.floor(10 / 3)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shops;
