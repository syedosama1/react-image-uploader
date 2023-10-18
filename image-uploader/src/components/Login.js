// Login.js
import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [flag, setFlag] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const storedEmail = localStorage.getItem("syedSubmissionEmail");
    const storedPassword = localStorage.getItem("syedSubmissionPassword");

    if (!email || !password) {
      setFlag(true);
      setErrorMessage("All fields are required");
    } else if (password !== storedPassword || email !== storedEmail) {
      setFlag(true);
      setErrorMessage("Invalid email or password");
    } else {
      setFlag(false);
      navigate("/home"); // Redirect to the home page after successful login
    }
  };


  return (
    <div className="login template d-flex justify-content-center align-items-center 160-w vh-100 bg-primary">
      <div className="form_container p-5 rounded bg-white">
        <form>
          <h3 className="text-center">Log In</h3>

          <div className="mb-2 text-start">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              ref={emailRef}
            />
          </div>
          <div className="mb-2 text-start">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                ref={passwordRef}
              />
              <span
                className="input-group-text"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <div className="d-grid">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>

          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <p className="forgot-password text-right">
            <Link to="/reset">Forgot Password?</Link>
          </p>

          <p className="forgot-password text-right">
            Not registered?{" "}
            <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
