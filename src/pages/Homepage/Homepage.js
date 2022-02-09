import React from "react";
import { Link } from "react-router-dom";
import NewCollectionImg from "../../assets/home-main.jpg";
import HomeCategoryBoxes from "../../components/HomeCategoriesBoxes/HomeCategoryBoxes";
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="home">
      <div className="new-collection-container">
        <img
          src={NewCollectionImg}
          alt="storage furniture"
          className="new-collection-img"
        />
        <div className="new-collection-info">
          <h2>Latest arrivals in our 2022 Collection</h2>
          <Link to="/shop" className="shop-btn">
            Shop Now
          </Link>
        </div>
      </div>
      <HomeCategoryBoxes />
    </div>
  );
};

export default Homepage;
