import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Correct API base URL (make sure this matches your backend deployment)
const API_BASE_URL = "https://randomchat-backend-m8mt.onrender.com/api/auth"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // ✅ Correct API endpoint for login
      const res = await axios.post(`${API_BASE_URL}/login`, { email, password }, { 
        withCredentials: true, // Allow cookies for authentication
        headers: { "Content-Type": "application/json" }, // Ensure correct request headers
      });

      // ✅ Store token & user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("email", res.data.email);

      // ✅ Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        // API responded with an error (e.g., 400 Bad Request)
        setError(error.response.data.msg || "Invalid email or password.");
      } else if (error.request) {
        // No response from server (CORS or server issue)
        setError("No response from server. Please check your backend.");
      } else {
        // Other unexpected errors
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
