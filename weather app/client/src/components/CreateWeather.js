import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateWeather = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    location: "",
    temperature: "",
    condition: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.post("http://localhost:5000/weather", weatherData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Weather data saved!");
      } catch (err) {
        console.error(err);
        alert("Error saving weather data");
      }
    } else {
      alert("You are not logged in!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Input Weather Information</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Location"
          value={weatherData.location}
          onChange={(e) =>
            setWeatherData({ ...weatherData, location: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Temperature"
          value={weatherData.temperature}
          onChange={(e) =>
            setWeatherData({ ...weatherData, temperature: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Condition"
          value={weatherData.condition}
          onChange={(e) =>
            setWeatherData({ ...weatherData, condition: e.target.value })
          }
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <button className="btn btn-secondary mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default CreateWeather;
