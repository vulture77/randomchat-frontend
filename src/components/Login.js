import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation

  // ✅ Use your live backend API URL
  const API_URL = "https://your-backend.onrender.com/api/auth/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const res = await axios.post(API_URL, { email, password });

      // ✅ Store token securely
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("email", res.data.email);

      // ✅ Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        // API error (e.g., 400, 401)
        setError(error.response.data.msg || "Invalid credentials");
      } else if (error.request) {
        // No response from server
        setError("No response from server. Please check your internet or backend.");
      } else {
        // Unexpected error
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Show error message if any */}

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
