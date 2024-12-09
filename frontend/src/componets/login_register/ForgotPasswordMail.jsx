import React, { useState } from "react";

const ForgotPasswordMail = ({
  SetModalClose,
  handleForgotPassword,
  resetEmail,
  setResetEmail,
}) => {
  const [error, setError] = useState("");

  const handleConfirm = () => {
    // Validate email
    if (!validateEmail(resetEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(""); // Clear any previous error

    handleForgotPassword();
    // Call API or handle logic for forgot password
    console.log("Email submitted:", resetEmail);
    SetModalClose(true);
  };

  const handleCancel = () => {
    SetModalClose(true);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Enter your Email id
        </h2>
        <div className="text-sm text-gray-600 mb-6">
          <input
            className="bg-slate-200 w-full px-3 py-2 rounded-lg"
            type="email"
            required
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            placeholder="Email Id"
          />
          {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordMail;
