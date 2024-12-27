import React from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

const PageHeading = ({ heading, breadcrumbs }) => {
  return (
    <div>
      <div className='bg-[url("http://localhost:3000/images/banner/shop.png")] h-[180px] mb-3  bg-cover bg-left'>
        <div className="bg-[#2422228a] w-full h-full ">
          <div className="flex flex-col justify-center items-center text-white h-full w-full gap-2 text-xl ">
            <h1 className="font-extrabold text-2xl">{heading}</h1>
            <div className="flex flex-row justify-center items-center text-base gap-2">
              {Object.entries(breadcrumbs).map(
                ([breadcrumbsPath, route], index, arr) => {
                  return (
                    <React.Fragment key={route}>
                      <Link to={route}>{breadcrumbsPath}</Link>
                      {index < arr.length - 1 && (
                        <span>
                          <FaAngleRight />
                        </span>
                      )}
                    </React.Fragment>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeading;
