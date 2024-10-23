import React, { useState, useEffect } from "react";
import axios from "axios";

const Result = () => {
  const [emiResults, setEmiResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/emi", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmiResults(response.data);
    };
    fetchResults();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Your EMI Results</h2>
      <div className="row">
        {emiResults.map((result, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">EMI Entry {index + 1}</h5>
                <p className="card-text">Principal: ₹{result.principal}</p>
                <p className="card-text">Rate: {result.rate}%</p>
                <p className="card-text">Time: {result.time} months</p>
                <p className="card-text">EMI: ₹{result.emi}</p>
                <p className="card-text">
                  Date: {new Date(result.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
