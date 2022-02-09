import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { DataContext } from "../../contexts/DataContext";
import { IoMdCart } from "react-icons/io";
import { Link } from "react-router-dom";
import { FilteredContext } from "../../App";
import "./AllProducts.css";

const ProductsOverview = () => {
  const productsData = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const { dispatch } = useContext(CartContext);
  const [filteredData] = useContext(FilteredContext);
  const [newProductsData, setNewProductsData] = useState([]);

  useEffect(() => {
    const getProductsData = () => {
      if (filteredData) {
        setNewProductsData(filteredData);
      } else {
        setNewProductsData(productsData);
      }
    };
    getProductsData();
  }, [filteredData, productsData]);

  const itemsPerPage = 6;
  const pageNumbers = [];
  const pages = productsData.length / 6;
  for (let i = 1; i <= Math.ceil(pages); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = newProductsData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <section>
      <div className="product-grid">
        {currentData.map((item, index) => (
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
      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={prevPage}
        >
          &laquo;
        </button>
        {pageNumbers.map((number) => {
          return (
            <li
              key={number}
              id={number}
              className={
                currentPage === number ? "page-number active" : "page-number"
              }
              onClick={handlePageClick}
            >
              {number}
            </li>
          );
        })}
        <button
          disabled={currentPage === pages}
          className="pagination-btn"
          onClick={nextPage}
        >
          &raquo;
        </button>
      </div>
    </section>
  );
};

export default ProductsOverview;
