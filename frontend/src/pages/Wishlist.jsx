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
      <div className="grid grid-cols-3 md-lg:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 ">
        {wishlist.map((product) => (
          <WishlistProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
