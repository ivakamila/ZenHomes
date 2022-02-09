import React from "react";
import AllProducts from "../../components/AllProducts/AllProducts";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Shop.css";

const Shop = () => {
  return (
    <div className="shop">
      <Sidebar />
      <AllProducts />
    </div>
  );
};

export default Shop;
