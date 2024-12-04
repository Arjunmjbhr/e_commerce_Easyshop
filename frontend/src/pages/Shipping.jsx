import React from "react";
import Header from "../componets/Header";
import Footer from "../componets/Footer";
import PageHeading from "../componets/PageHeading";

const Shipping = () => {
  return (
    <div>
      <Header />
      <PageHeading
        heading="Shopping Page"
        breadcrumbs={{
          Home: "/",
          cart: "/cart",
          shipping: "shipping",
        }}
      />
      <section>
        <div className="bg-[#eee]"></div>
      </section>
      <Footer />
    </div>
  );
};

export default Shipping;
