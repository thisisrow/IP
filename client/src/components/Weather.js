import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get("http://localhost:5000/weather");
      setWeatherData(response.data);
    };
    fetchWeather();
  }, []);

  const filteredWeather = weatherData.filter((w) =>
    w.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Weather Information</h2>
      <input
        type="text"
        placeholder="Search by Location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row">
        {filteredWeather.map((w, index) => (
          <div key={index} className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{w.location}</h5>
                <p className="card-text">Temperature: {w.temperature}°C</p>
                <p className="card-text">Condition: {w.condition}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
