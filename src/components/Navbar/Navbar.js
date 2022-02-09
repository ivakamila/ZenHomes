import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { CategoriesList } from "../../assets/CategoriesList";
import { useAuth } from "../../contexts/AuthContext";
import { useCartContext } from "../../contexts/CartContext";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCart } from "react-icons/io";
import Search from "../Search/Search";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const {
    state: { totalCount },
  } = useCartContext();

  const handleAuthentication = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="hamburger" onClick={handleClick}>
        {open ? (
          <AiOutlineCloseCircle className="burger-icon close" />
        ) : (
          <GiHamburgerMenu className="burger-icon open" />
        )}
        <i
          className={
            open ? "burger-icon fas fa-times" : "burger-icon fas fa-bars"
          }
        ></i>
      </div>
      <div className={`nav-links ${open ? "active" : ""}`} onClick={closeMenu}>
        <div className="left">
          <div className="dropdown">
            <Link to="/shop" className="dropdown-header">
              Shop
            </Link>
            <div className="dropdown-content">
              {CategoriesList.map((item, index) => (
                <Link
                  to={`/category/${item.split(" ").join("-")}`}
                  key={index}
                  className="cateogry-list-item"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="right">
          <Search />
          {currentUser ? (
            <Link
              to="/"
              onClick={handleAuthentication}
              className="cateogry-list-item"
            >
              Sign Out
            </Link>
          ) : (
            <Link to="/sign-in" className="cateogry-list-item">
              Sign In
            </Link>
          )}
          <Link to="/cart" className="nav-icon">
            <IoMdCart />: {totalCount}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
