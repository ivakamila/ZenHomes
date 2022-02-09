import React from "react";
import { Link } from "react-router-dom";
import { CategoriesList } from "../../assets/CategoriesList";
import Filter from "../Filter/Filter";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="categories">
        <h2>Categories</h2>
        {CategoriesList.map((item, index) => (
          <div className="categories-list" key={index}>
            <Link to={`/category/${item.split(" ").join("-")}`} key={index}>
              {item}s
            </Link>
          </div>
        ))}
      </div>
      <div className="filters">
        <Filter />
      </div>
    </div>
  );
};

export default Sidebar;
