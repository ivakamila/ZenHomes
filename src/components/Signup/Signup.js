import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { AiFillLock } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Sign Up</h1>
        {error && <p>{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            E-mail
            <div className="form-input">
              <div className="icon-container">
                <BsFillPersonFill className="icon" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>
          <label>
            Password
            <div className="form-input">
              <div className="icon-container">
                <AiFillLock className="icon" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </label>
          <button className="login-btn" type="submit">
            Sign Up
          </button>
          <p>OR</p>
          <div className="login-link">
            <span>Already have an account? </span>
            <Link to="/sign-in">Log In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
