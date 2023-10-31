// Registration.js
import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { Link,  useNavigate } from "react-router-dom";
import { checkValidData } from "../utils/validation";

function Registration() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);

  const [flag, setFlag] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const message = checkValidData(
      emailRef.current.value,
      
      passwordRef.current.value,
      phoneRef.current.value
    );
    setErrorMessage(message);

    if (message) {
      setFlag(true);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const phone = phoneRef.current.value;

    if (!email || !password || !phone) {
      setFlag(true);
      setErrorMessage("All fields are required");
    } else {
      setFlag(false);
      localStorage.setItem("syedSubmissionEmail", email);
      localStorage.setItem("syedSubmissionPassword", password);
      console.log("Saved in Local Storage");
      navigate("/"); // Redirect to the login page after successful registration
    }
  };

  return (
    <div className="registration template d-flex justify-content-center align-items-center 120-w vh-100 bg-primary">
      <div className="form_container p-5 rounded bg-white">
        <form onSubmit={handleFormSubmit}>
          <h3 className="text-center">Register</h3>

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
            <label htmlFor="phone-number">Phone No.</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter contact no"
              ref={phoneRef}
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
              type="submit"
              className="btn btn-primary"
              onClick={handleButtonClick}
            >
              Register
            </button>
          </div>

          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <p className="forgot-password text-right">
            Already registered?{" "}
            <Link to="/">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
