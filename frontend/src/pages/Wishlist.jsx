import React, { useEffect } from "react";
import WishlistProductCard from "../componets/wishlist/WishlistProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  get_wishlist_products,
  messageClearWishlist,
} from "../store/reducers/wishlistReducer";
import toast from "react-hot-toast";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.authUser);
  const { wishlist, wishlistErrorMessage, wishlistSuccessMessage } =
    useSelector((store) => store.wishlist);

  useEffect(() => {
    dispatch(get_wishlist_products(userInfo.id));
  }, [dispatch, userInfo.id, wishlistSuccessMessage]);

  useEffect(() => {
    if (wishlistSuccessMessage) {
      toast.success(wishlistSuccessMessage);
      dispatch(messageClearWishlist());
    }
    if (wishlistErrorMessage) {
      toast.error(wishlistErrorMessage);
      dispatch(messageClearWishlist());
    }
  }, [wishlistErrorMessage, wishlistSuccessMessage, dispatch]);
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
