import React from "react";
import WishlistProductCard from "../componets/wishlist/WishlistProductCard";

const Wishlist = () => {
  return (
    <div>
      <div className="grid grid-cols-5 md-lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
        {[1, 2, 3, 4, 5, 6].map((product) => (
          <WishlistProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
