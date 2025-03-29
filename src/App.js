import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"; 

<Routes>
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
</Routes>

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Welcome to RandomChat</h1>
        <nav>
          <Link to="/register" style={{ marginRight: "10px", fontSize: "20px" }}>Register</Link>
          <Link to="/login" style={{ fontSize: "20px" }}>Login</Link>
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
