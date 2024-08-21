import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";

const UnauthorizedPage: React.FC = () => {
  const [countdown, setCountdown] = useState(3); // Countdown for 3 seconds
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // When countdown reaches 0, clear the token, log out, and redirect to login page
    if (countdown === 0) {
      clearInterval(timer);
      localStorage.removeItem("token"); // Clear the token from localStorage
      logout(); // Logout the user
      navigate("/login"); // Redirect to the login page
    }

    return () => clearInterval(timer); // Cleanup the timer on unmount
  }, [countdown, logout, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Unauthorized Access</h1>
      <p>You will be redirected to the login page in {countdown} seconds.</p>
    </div>
  );
};

export default UnauthorizedPage;
