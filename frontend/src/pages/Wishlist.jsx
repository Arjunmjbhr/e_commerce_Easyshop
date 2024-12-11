import React, { useEffect } from "react";
import WishlistProductCard from "../componets/wishlist/WishlistProductCard";
import { useDispatch, useSelector } from "react-redux";
import { get_wishlist_products } from "../store/reducers/wishlistReducer";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.authUser);
  const { wishlist } = useSelector((store) => store.wishlist);

  useEffect(() => {
    dispatch(get_wishlist_products(userInfo.id));
  }, [dispatch, userInfo.id]);
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
