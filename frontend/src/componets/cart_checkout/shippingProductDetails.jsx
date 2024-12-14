import React from "react";

import ShippingProduct from "./ShippingProduct";
import CartProduct from "./CartProduct";

const ShippingProductDetails = ({ cart_products, isShipping }) => {
  return (
    <div className="mt-3">
      {cart_products.map((shop) => (
        <div className="bg-white p-4 flex flex-col gap-2 mt-2">
          <div>
            <h2 className="text-md text-slate-600 font-semibold">
              {shop?.shopName}
            </h2>
          </div>
          <ShippingProduct shop={shop} isShipping={isShipping} />
        </div>
      ))}
    </div>
  );
};

export default ShippingProductDetails;
