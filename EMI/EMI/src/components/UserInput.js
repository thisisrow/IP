import React, { useState } from "react";
import axios from "axios";

const UserInput = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [emi, setEmi] = useState(null);

  const calculateEMI = (P, R, T) => {
    const r = R / (12 * 100); // monthly interest
    const emiValue = (P * r * Math.pow(1 + r, T)) / (Math.pow(1 + r, T) - 1);
    return emiValue.toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emiValue = calculateEMI(principal, rate, time);
    setEmi(emiValue);

    // Save the EMI result to the database
    const token = localStorage.getItem("token");
    if (token) {
      await axios.post(
        "http://localhost:5000/emi",
        { principal, rate, time, emi: emiValue },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2>Calculate EMI</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Principal Amount"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          required
          className="form-control mb-2"
        />
        <input
          type="number"
          placeholder="Annual Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          required
          className="form-control mb-2"
        />
        <input
          type="number"
          placeholder="Time (Months)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">
          Calculate EMI
        </button>
      </form>
      {emi && <h3>Your EMI: ₹{emi}</h3>}
    </div>
  );
};

export default UserInput;
