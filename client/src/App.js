import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Weather from "./components/Weather";
import AdminRegister from "./components/AdminRegister";
import AdminLogin from "./components/AdminLogin";
import CreateWeather from "./components/CreateWeather";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/create" element={<CreateWeather />} />
      </Routes>
    </Router>
  );
}

export default App;
