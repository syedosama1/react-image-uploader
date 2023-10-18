import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";

function ResetPassword() {
  const emailRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordReset = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (newPassword !== confirmPassword) {
      setResetError("Passwords don't match");
      setResetSuccess(false);
    } else {
      const storedEmail = localStorage.getItem("syedSubmissionEmail");
      const storedPassword = localStorage.getItem("syedSubmissionPassword");
      console.log("Stored Email:", storedEmail);
      console.log("Stored Password:", storedPassword);

      if (email === storedEmail && newPassword !== storedPassword) {
        // Update the password in local storage with the new password
        localStorage.setItem("syedSubmissionPassword", newPassword);

        setResetSuccess(true);
        setResetError("");
      } else {
        setResetSuccess(false);
        setResetError("Password reset failed. Please try again.");
      }
    }
  };

  const handleGoToLogin = () => {
    window.location.href = "/"; // This will change the URL to the login page
  };

  
  return (
    <div className="reset-password login template d-flex justify-content-center align-items-center 120-w vh-100 bg-primary">
      {resetSuccess ? (
        <div>
          <Alert variant="success">Password reset successful!</Alert>
          <button className="btn btn-primary" onClick={handleGoToLogin}>
            Go to Login
          </button>
        </div>
      ) : resetError ? (
        <Alert variant="danger">{resetError}</Alert>
      ) : (
        <div className="form_container p-5 rounded bg-white">
          <form onSubmit={handlePasswordReset}>
            <h1>Reset Password</h1>

            <div className="mb-3">
              <label htmlFor="email">Email</label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                ref={emailRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword">New Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "Hide" : "Show"}
                  className="form-control"
                  placeholder="Enter new password"
                  ref={newPasswordRef}
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "Hide" : "Show"}
                  className="form-control"
                  placeholder="Confirm new password"
                  ref={confirmPasswordRef}
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
