import React, { useEffect } from "react";
import WishlistProductCard from "../componets/wishlist/WishlistProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  get_wishlist_products,
  messageClearWishlist,
} from "../store/reducers/wishlistReducer";
import toast from "react-hot-toast";
import { messageClear } from "../store/reducers/cartReducer";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.authUser);
  // subscribe to tht store
  const { wishlist, wishlistErrorMessage, wishlistSuccessMessage } =
    useSelector((store) => store.wishlist);
  const { errorMessage, successMessage } = useSelector((store) => store.cart);
  // page content dispatch

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

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div>
      <div className="grid grid-cols-3 md-lg:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 ">
        {wishlist.map((pro) => (
          <WishlistProductCard pro={pro} key={pro._id} userInfo={userInfo} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
