import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://your-backend.onrender.com/api/auth"; // Update this

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/register`, formData, { withCredentials: true });
      alert("Registration successful");
    } catch (error) {
      alert("Error: " + (error.response?.data?.msg || "Something went wrong"));
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Register</h2>
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
