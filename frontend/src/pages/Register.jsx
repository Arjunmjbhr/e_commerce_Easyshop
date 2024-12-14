import React, { useState, useEffect } from "react";
import Header from "../componets/Header";
import Footer from "../componets/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_categories } from "../store/reducers/homeReducer";
import {
  customer_register,
  messageClear,
  send_otp,
  verify_otp,
} from "../store/reducers/authUserReducer";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import GoogleLoginComponent from "./../componets/GoogleLoginComponent";
import { validateUserDetails } from "../utils/validation";

const Register = () => {
  const [state, setState] = useState({
    name: "",
    password: "",
    email: "",
    confirmPassword: "",
    referralId: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [otpInputs, setOtpInputs] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(0); // Start with 30 seconds
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Button is disabled initially
  const [isOtpSent, setIsOtpSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((store) => store.home);
  const { loader, errorMessage, userInfo, successMessage } = useSelector(
    (store) => store.authUser
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const handleForm = (e) => {
    e.preventDefault();

    dispatch(customer_register(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);

      if (successMessage === "OTP sent successfully!") {
        setShowModal(true);
        setIsOtpSent(true);
      }
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [successMessage, errorMessage, userInfo, dispatch]);

  // closing modal
  const closeModal = () => setShowModal(false);
  // value entering in to the field
  const handleOtpChange = (index, value) => {
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value.slice(0, 1); // Ensure only 1 digit
    setOtpInputs(newOtpInputs);

    // Auto-focus next input field if a digit is entered
    if (value && index < otpInputs.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };
  //sending otp
  const handleSubmit = (e) => {
    e.preventDefault();
    // password and confirm password checking
    if (state.password !== state.confirmPassword) {
      toast.error("Passwords does not match.");
      return;
    }

    const error = validateUserDetails(state.name, state.password, state.email);
    if (error) {
      return toast.error(error);
    }
    dispatch(messageClear());
    dispatch(send_otp(state.email)); // Send OTP request

    // cut modal code to success message
  };

  // handling otp submit
  const handleOtpSubmit = (e) => {
    e.preventDefault();

    const otp = otpInputs.join(""); // Combine all OTP inputs into a single string
    const data = {
      email: state.email,
      password: state.password,
      name: state.name,
      otp,
      referralId: state.referralId,
    };
    dispatch(verify_otp(data)); // Verify OTP request
  };
  useEffect(() => {
    let interval;

    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1); // Decrease timer by 1 every second
      }, 1000);
    }
    if (timer === 0) {
      setIsOtpSent(false); // Stop the timer logic
      setIsButtonDisabled(false); // Enable the button
      clearInterval(interval); // Clear interval
    }

    return () => clearInterval(interval);
    // Clean up the interval when component is removed or timer is reset
  }, [timer, isOtpSent]); // Run this effect every time the timer changes

  const handleResendClick = () => {
    if (!isButtonDisabled) {
      // Check if button is enabled
      dispatch(send_otp(state.email)); // Call the function to resend the OTP
      setTimer(30); // Reset the timer back to 30 seconds
      setIsButtonDisabled(true); // Disable the button again
      setIsOtpSent(true);
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-slate-200 mt-4">
        <div className="w-full justify-center items-center p-10">
          <div className="grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md md:grid-cols-1 sm:w-[90%] md-lg:w-[80%]">
            <div className="px-8 py-8">
              <h2 className="text-center mb-5 w-full text-2xl text-slate-600 font-bold">
                Register
              </h2>

              <div>
                <form onSubmit={handleSubmit} className="text-slate-600">
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="name">Name</label>
                    <input
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      value={state.name}
                      onChange={handleInput}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={state.email}
                      onChange={handleInput}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="password">Password</label>
                    <input
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={state.password}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      value={state.confirmPassword}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="confirmPassword">Referral Id</label>
                    <input
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md"
                      type="text"
                      name="referralId"
                      id="referralId"
                      placeholder="Referral Id"
                      value={state.referralId}
                      onChange={handleInput}
                    />
                  </div>

                  <button
                    disabled={loader}
                    className="px-8 w-full py-2 bg-[#059473] shadow-lg hover:shadow-green-500/40 text-white rounded-md"
                  >
                    {loader ? (
                      <ClipLoader size={30} color="white" />
                    ) : (
                      "Register"
                    )}
                  </button>
                </form>
                <div className="flex justify-center items-center py-2">
                  <div className="h-[1px] bg-slate-300 w-[95%]"> </div>
                  <span className="px-3 text-slate-600">Or</span>
                  <div className="h-[1px] bg-slate-300 w-[95%]"> </div>
                </div>
              </div>
              <div>
                <GoogleLoginComponent />
              </div>
              <div className=" hidden md:block text-center text-slate-600 pt-1">
                <p>
                  Do you have already an account ?
                  <Link className="text-blue-500" to="/login">
                    Login
                  </Link>
                </p>
              </div>
            </div>

            <div className=" md:hidden flex-col justify-center items-center bg-gradient-to-br from-green-500 to-green-700 text-white p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Welcome</h3>
              <p className="text-lg italic">
                "The future belongs to those who believe in the beauty of their
                dreams."
              </p>
              <p className="text-lg italic mt-4">
                "Your journey begins here. Let's make it extraordinary."
              </p>
              <div className="text-cente mt-[100px] flex flex-col">
                <h1>Do you have already an account ?</h1>
                <h1 className="m-3">
                  <Link
                    className="text-white px-3 py-2 bg-red-600 rounded-lg hover:bg-red-700"
                    to="/login"
                  >
                    Login Here
                  </Link>
                </h1>
              </div>
            </div>
          </div>
          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 text-center shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Enter OTP</h3>
                <p className="mb-4">OTP send to registerd email id</p>
                <form
                  onSubmit={handleOtpSubmit}
                  className="flex justify-center gap-2"
                >
                  {otpInputs.map((input, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="number"
                      value={otpInputs[index]}
                      required
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-center border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-xl"
                      maxLength="1"
                    />
                  ))}

                  <button
                    type="submit"
                    className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Verify
                  </button>
                </form>
                <p
                  onClick={handleResendClick}
                  className={`w-full text-left text-sm mt-3 text-blue-600 cursor-pointer ${
                    isButtonDisabled ? "cursor-not-allowed text-gray-400" : ""
                  }`}
                >
                  {isButtonDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
                </p>

                <div className="flex ">
                  <button
                    onClick={closeModal}
                    className="mt-4  bg-gray-500 text-white mx-auto px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
