import React from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css"; // Ensure you import the carousel styles

const Banner = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-full ">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="w-full flex flex-wrap md-lg:gap-8">
          <div className="w-full">
            <div className="">
              <Carousel
                autoPlay={true} // Automatically cycles through images
                infinite={true} // Loops the carousel
                arrows={true} // Shows navigation arrows
                showDots={true} // Displays dots for navigation
                responsive={responsive}
              >
                {[1, 2, 3, 4, 5, 6].map((img, index) => (
                  <Link key={index} to={`/banner/${img}`}>
                    <img
                      src={`http://localhost:3001/images/banner/${img}.jpg`}
                      alt={`Banner ${img}`}
                      className="w-full object-cover"
                    />
                  </Link>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
