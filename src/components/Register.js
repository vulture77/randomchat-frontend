import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ For redirection after registration

  // ✅ Update API URL for live deployment
  const API_URL = "https://your-backend.onrender.com/api/auth/register";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      await axios.post(API_URL, formData);
      alert("Registration successful! Redirecting to login...");

      // ✅ Redirect user to login page after successful registration
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg || "Registration failed.");
      } else if (error.request) {
        setError("No response from server. Please check your internet or backend.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Registration Error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error message if any */}

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
