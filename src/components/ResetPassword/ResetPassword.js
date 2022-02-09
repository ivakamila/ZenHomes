import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();

  return (
    <div className="password-reset">
      <div className="reset-container">
        <h1>Forgot your password</h1>
        <p>
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <form className="reset-form" onSubmit={() => resetPassword(email)}>
          <label>
            E-mail
            <div className="form-input">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>
          <button className="reset-btn" type="submit">
            Reset Password
          </button>
          <div className="login-link">
            <span>Don't have an account? </span>
            <Link to="/sign-up">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
