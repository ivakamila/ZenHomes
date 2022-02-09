import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import { CartContext } from "../../contexts/CartContext";
import { IoMdCart } from "react-icons/io";
import { FilteredContext } from "../../App";
import "./CategoryPage.css";

const CategoryPage = () => {
  const productsData = useContext(DataContext);
  const [categoryData, setCategoryData] = useState([]);
  const [filteredData] = useContext(FilteredContext);
  let { category } = useParams();
  const { dispatch } = useContext(CartContext);
  category = category.split("-").join(" ");

  useEffect(() => {
    function getCategory() {
      if (filteredData) {
        setCategoryData(
          filteredData.filter((product) => product.category === category)
        );
      } else {
        setCategoryData(
          productsData.filter((product) => product.category === category)
        );
      }
    }
    getCategory();
  }, [category, filteredData]);

  return (
    <div className="category-page">
      <Sidebar />
      <div className="product-grid">
        {categoryData.map((item, index) => (
          <div className="product" key={index}>
            <Link to={`/product/${item.productName}`}>
              <img
                src={item.productImg}
                alt={item.productName}
                className="product-img"
              />
            </Link>
            <Link to={`/product/${item.productName}`} className="product-link">
              <h3>
                {item.productName} {item.category}
              </h3>
            </Link>
            <p>${item.price}</p>
            <button
              onClick={(payload) => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: {
                    productName: item.productName,
                    category: item.category,
                    image: item.productImg,
                    price: item.price,
                    productCount: 1,
                  },
                });
              }}
            >
              <IoMdCart />
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
