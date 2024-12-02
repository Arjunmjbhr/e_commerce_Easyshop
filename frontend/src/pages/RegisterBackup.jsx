import React, { useState, useEffect } from "react";
import Header from "../componets/Header";
import Footer from "../componets/Footer";
import { FaFacebookF } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_categories } from "../store/reducers/homeReducer";
import {
  customer_register,
  messageClear,
} from "../store/reducers/authUserReducer";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import GoogleLoginComponent from "./../componets/GoogleLoginComponent";

const Register = () => {
  const [state, setState] = useState({
    name: "",
    password: "",
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((store) => store.home);
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
    dispatch(get_categories());
  }, []);
  const { loader, errorMessage, userInfo, successMessage } = useSelector(
    (store) => store.authUser
  );
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [successMessage, errorMessage, userInfo]);

  return (
    <div>
      <Header categories={categories} />
      <div className="bg-slate-200 mt-4">
        <div className="w-full justify-center items-center p-10">
          <div className="grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md md:grid-cols-1 sm:w-[90%] md-lg:w-[80%]">
            <div className="px-8 py-8">
              <h2 className="text-center mb-5 w-full text-2xl text-slate-600 font-bold">
                Register
              </h2>

              <div>
                <form onSubmit={handleForm} className="text-slate-600">
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
