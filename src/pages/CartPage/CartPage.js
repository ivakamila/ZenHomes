import React, { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import "./CartPage.css";

const CartPage = () => {
  const [productCount, setProductCount] = useState();
  const {
    state: { cart, totalPrice, totalCount },
    removeFromCart,
    addCount,
    minusCount,
    emptyCart,
  } = useContext(CartContext);

  const updateCount = (e) => {
    e.preventDefault();
    setProductCount(productCount);
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length <= 0 && <p>There are no items in the cart!</p>}
      {cart.map((item, index) => {
        return (
          <div className="cart-item" key={index}>
            <img src={item.image} alt={item.productName} />
            <h2>
              {item.productName} {item.category}
            </h2>
            <p className="item-price">${item.price}</p>
            <div className="count">
              <button className="minut-btn" onClick={() => minusCount(item)}>
                -
              </button>
              <input
                type="text"
                value={item.productCount}
                onChange={updateCount}
              />
              <button
                className="plus-btn"
                onClick={() => {
                  addCount(item);
                }}
              >
                +
              </button>
            </div>
            <p className="total-price">${item.productCount * item.price}</p>
            <FaTrashAlt
              className="remove-btn"
              onClick={() => removeFromCart(item)}
            />
          </div>
        );
      })}
      {cart.length > 0 && (
        <div className="cart-final">
          <button className="clear-btn" onClick={() => emptyCart()}>
            Clear Cart
          </button>
          <div className="summary">
            <h3>Subtotal ({totalCount}) items</h3>
            <h3>Total: ${totalPrice}</h3>
            <h3>Shipping: FREE</h3>
            <button className="checkout-btn" disabled>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
