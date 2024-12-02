import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // Make sure to import GoogleLogin correctly
import { useDispatch } from "react-redux";
import { googleLogin } from "../store/reducers/authUserReducer";
import { toast } from "react-hot-toast";

const GoogleLoginComponent = () => {
  const clientId =
    "741734476183-i0h9pm7u4o24r7jo0as48ullj89m78vs.apps.googleusercontent.com";
  const dispatch = useDispatch();

  const handleSuccess = (credentialResponse) => {
    dispatch(googleLogin(credentialResponse));
  };

  const handleError = () => {
    toast("Error while login using google account ");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
