import React from "react";
import { FaTruck } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { RiCustomerService2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="services-container">
        <div className="service-item">
          <FaTruck className="service-icon" />
          <p>Free shipping and open purchase</p>
        </div>
        <div className="service-item">
          <RiSecurePaymentFill className="service-icon" />
          <p>We offer simple and secure payment options</p>
        </div>
        <div className="service-item">
          <RiCustomerService2Fill className="service-icon" />
          <p>Our support system is always there to help you</p>
        </div>
      </div>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <p>Copyright © 2022 | ZenHomes</p>
    </div>
  );
};

export default Footer;
