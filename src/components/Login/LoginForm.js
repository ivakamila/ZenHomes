import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { AiFillLock } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Sign In</h1>
        <form className="login-form" onClick={handleSubmit}>
          <label htmlFor="email">E-mail </label>
          <div className="form-input">
            <div className="icon-container">
              <BsFillPersonFill className="icon" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label htmlFor="password">Password </label>
          <div className="form-input">
            <div className="icon-container">
              <AiFillLock className="icon" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Link to="/reset-password">Forgot password?</Link>
          <button className="login-btn" type="submit">
            Sign In
          </button>
          <p>OR</p>
          <div className="register-link">
            <Link to="/sign-up">Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
