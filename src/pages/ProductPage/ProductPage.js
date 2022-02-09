import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import { IoMdCart } from "react-icons/io";
import { DataContext } from "../../contexts/DataContext";
import { CartContext } from "../../contexts/CartContext";

const ProductPage = () => {
  const productsData = useContext(DataContext);
  const [productData, setProductData] = useState({});
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { productName } = useParams();
  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    function getProduct() {
      setIsLoading(true);
      setProductData(
        productsData.find((product) => product.productName === productName) ||
          null
      );
      setIsLoading(false);
    }
    getProduct();
  }, [productName]);

  const updateCount = (e) => {
    e.preventDefault();
    setCount(e.target.value);
  };

  const addToCart = (payload) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        productName: productData.productName,
        category: productData.category,
        image: productData.productImg,
        price: productData.price,
        productCount: count,
      },
    });
  };

  const {
    productImg,
    category,
    price,
    material,
    color,
    dimensions,
    description,
  } = productData;

  return (
    <div className="product-page">
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div className="product-container">
          <div className="product-left">
            <img src={productImg} alt={productName} />
          </div>
          <div className="product-right">
            <div className="product-info">
              <h2>
                {productName} {category}
              </h2>
              <p className="price">${price}</p>
              <div className="add-cart">
                <div className="quantity">
                  <button
                    className="minut-btn"
                    onClick={() => {
                      if (count > 0) {
                        setCount(count - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    placeholder="1"
                    value={count}
                    onChange={updateCount}
                  />
                  <button
                    className="plus-btn"
                    onClick={() => setCount(count + 1)}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => addToCart()}>
                  <IoMdCart />
                  Add to cart
                </button>
              </div>
            </div>
            <p>{description}</p>
            <div className="product-specifications">
              <h3>Product Specifications</h3>
              <table className="specs-table">
                <tbody>
                  <tr>
                    <th>Material</th>
                    <td>{material}</td>
                  </tr>
                  <tr>
                    <th>Color</th>
                    <td>{color}</td>
                  </tr>
                  <tr>
                    <th>Dimensions (cm)</th>
                    <td>{dimensions}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
