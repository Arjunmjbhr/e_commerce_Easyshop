import React from "react";
import CartProduct from "./CartProduct";

const OutOfStock = ({ outofstock_products }) => {
  return (
    <div className="mt-3">
      {outofstock_products.map((product) => (
        <div className="bg-white p-4 flex flex-col gap-2 mt-2">
          <div></div>
          <CartProduct shop={product} />
        </div>
      ))}
    </div>
  );
};

export default OutOfStock;
