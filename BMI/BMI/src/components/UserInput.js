import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserInput = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/bmi",
      { height, weight },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    alert("BMI calculated and saved!");
    navigate("/result");
  };

  return (
    <div className="container">
      <h2>Enter BMI Data</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Height (in cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="form-control mb-3"
        />
        <input
          type="number"
          placeholder="Weight (in kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="form-control mb-3"
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserInput;
