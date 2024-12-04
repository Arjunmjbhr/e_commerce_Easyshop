import React from "react";

const CartProductDetails = () => {
  return (
    <div className="mt-3">
      {[1, 2].map(() => (
        <div className="bg-white p-4 flex flex-col gap-2 mt-2">
          <div>
            <h2 className="text-md text-slate-600 font-semibold">EasyShop</h2>
          </div>
          <div>
            {[1, 2].map(() => (
              <div className="w-full flex flex-wrap bg-white ">
                <div className="flex sm:w-full gap-2 w-6/12">
                  <div className="flex justify-start items-center ">
                    <img
                      className="w-[80px] h-[80px] p-2"
                      src="http://localhost:3000/images/products/3.webp"
                      alt="product images"
                    />
                  </div>
                  <div className="pr-4 text-slate-600">
                    <h2 className="text-md font-semibold">Product Name</h2>
                    <span className="text-sm">Brand: Jara</span>
                  </div>
                </div>
                <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                  <div className="pl-4 sm:pl-0 text-md">
                    <h2 className=" text-orange-500">$240</h2>
                    <p className="line-through">$300</p>
                    <p>-15%</p>
                  </div>
                  <div className="flex flex-col gap-2 justify-center items-center">
                    {/* button for adding and reducing */}
                    <div className="flex bg-slate-200 h-[30px] justify-center items-center text-lg">
                      <div className="cursor-pointer px-2 text-2xl">-</div>
                      <div className="cursor-pointer px-2">2</div>
                      <div className="cursor-pointer px-2">+</div>
                    </div>
                    {/* button for delete item in the cart */}
                    <div>
                      <button className="px-5 bg-red-500 text-white">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartProductDetails;
