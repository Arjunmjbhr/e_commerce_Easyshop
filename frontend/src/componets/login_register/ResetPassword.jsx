import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  reset_password,
  messageClear,
} from "../../store/reducers/authUserReducer";
import { BarLoader } from "react-spinners";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessageComponent, setErrorMessageComponent] = useState("");
  const { userId, token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();

    // Validate that passwords match
    if (password !== confirmPassword) {
      setErrorMessageComponent("Passwords do not match. Please try again.");
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.match(passwordRegex)) {
      setErrorMessageComponent(
        "Password must be \n at least 8 characters long, include at \n least one uppercase letter \n one lowercase letter \n one number \none special character."
      );
      return;
    }
    console.log(password);
    setErrorMessageComponent("");
    dispatch(reset_password({ userId, token, password }));
  };

  const { loader, errorMessage, successMessage, userInfo } = useSelector(
    (store) => store.authUser
  );

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/login");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, userInfo]);

  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="bg-green-400 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Reset Your Password
        </h2>

        {errorMessageComponent && (
          <p className="text-red-600 text-sm mb-4">{errorMessageComponent}</p>
        )}

        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {loader ? <BarLoader /> : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
