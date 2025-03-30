import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Correct API base URL (ensure this matches your backend deployment)
const API_BASE_URL = "https://randomchat-backend-m8mt.onrender.com/api/auth";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // ✅ Correct API endpoint for registration
      const res = await axios.post(`${API_BASE_URL}/register`, formData, { 
        withCredentials: true, // Allow cookies for authentication
        headers: { "Content-Type": "application/json" }, // Ensure correct request headers
      });

      // ✅ Store token & user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("email", res.data.email);

      // ✅ Redirect to dashboard after successful registration
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        // API responded with an error (e.g., 400 Bad Request)
        setError(error.response.data.msg || "Registration failed. Please try again.");
      } else if (error.request) {
        // No response from server (CORS or server issue)
        setError("No response from server. Please check your backend.");
      } else {
        // Other unexpected errors
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>} {/* Show error message if any */}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
