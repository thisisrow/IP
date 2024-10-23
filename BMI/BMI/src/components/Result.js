import React, { useState, useEffect } from "react";
import axios from "axios";

const Result = () => {
  const [bmiData, setBmiData] = useState([]);

  useEffect(() => {
    const fetchBmiData = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/bmi", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBmiData(response.data);
    };
    fetchBmiData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Your BMI Results</h2>
      <div className="row">
        {bmiData.map((data, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  BMI: {data.bmi} {getCategory(data.bmi)}
                </h5>
                <p className="card-text">Height: {data.height} cm</p>
                <p className="card-text">Weight: {data.weight} kg</p>
                <p className="card-text">Date: {data.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getCategory = (bmiValue) => {
  if (bmiValue < 18.5) {
    return <span className="badge bg-danger">Underweight</span>; // Red badge for Underweight
  } else if (bmiValue < 25) {
    return <span className="badge bg-success">Normal weight</span>; // Green badge for Normal weight
  } else if (bmiValue < 30) {
    return <span className="badge bg-warning">Overweight</span>; // Yellow badge for Overweight
  } else {
    return <span className="badge bg-danger">Obese</span>; // Red badge for Obese
  }
};

export default Result;
