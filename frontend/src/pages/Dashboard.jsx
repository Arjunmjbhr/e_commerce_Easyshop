import React, { useState } from "react";
import Footer from "../componets/Footer";
import Header from "../componets/Header";
import { FaList } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../componets/dashboard/Sidebar";

const Dashboard = () => {
  const [filterShow, setFilterShow] = useState(false);
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
                <Sidebar filterShow={filterShow} />
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
