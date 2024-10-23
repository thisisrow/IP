import React, { useState } from "react";
import axios from "axios";

const AdminRegister = () => {
  const [admin, setAdmin] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/register", admin);

    alert("Admin registered!");
  };

  return (
    <div className="container">
      <h2>Register Admin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={admin.username}
          onChange={(e) => setAdmin({ ...admin, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={admin.password}
          onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
        />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
