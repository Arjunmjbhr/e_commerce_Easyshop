import React, { useState, useEffect } from "react";
import Footer from "../componets/Footer";
import Header from "../componets/Header";
import { FaList } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../componets/dashboard/Sidebar";
import {
  logout_customer,
  user_reset,
  messageClear,
} from "../store/reducers/authUserReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { reset_count } from "../store/reducers/cartReducer";

const Dashboard = () => {
  const [filterShow, setFilterShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logoutMessage, errorMessage } = useSelector(
    (store) => store.authUser
  );

  const logout = async () => {
    console.log("logout");
    dispatch(logout_customer());
  };
  useEffect(() => {
    if (logoutMessage) {
      toast.success(logoutMessage);
      dispatch(messageClear());
      dispatch(reset_count());
      dispatch(user_reset());
      navigate("/login");
    }
    if (errorMessage) {
      toast.success(errorMessage);
      dispatch(messageClear());
    }
  }, [logoutMessage, errorMessage, dispatch, messageClear]);

  return (
    <div>
      <Header />
      <section>
        <div className="bg-slate-200 mt-5">
          <div className="w-[90%] mx-auto md-lg:block hidden">
            <div>
              <button
                onClick={() => setFilterShow(!filterShow)}
                className="text-center py-3 px-3 bg-green-500 text-white"
              >
                <FaList />
              </button>
            </div>
          </div>

          <div className="h-full mx-auto">
            <div className="py-5 flex md-lg:w-[90%] mx-auto relative">
              <div>
                {/* sidebar */}
                <Sidebar filterShow={filterShow} logout={logout} />
              </div>

              <div className="w-[calc(100%-270px)] md-lg:w-full">
                <div className="mx-4 md-lg:mx-0">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
