import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectUser = () => {
  const { userInfo } = useSelector((store) => store.authUser);
  if (userInfo) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default ProtectUser;
