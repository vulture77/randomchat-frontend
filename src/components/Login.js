import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://randomchat-backend-m8mt.onrender.com"; // Backend URL
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${API_BASE_URL}/login`,
        { email, password },
        { withCredentials: true } // Ensures cookies/auth headers are included
      );

      // Store token and user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("email", email);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
      } else if (error.request) {
        setError("No response from server. Please check your backend.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
