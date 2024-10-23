import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home"; // New component for the welcome page
import UserRegister from "./components/UserRegister"; // Component for user registration
import UserLogin from "./components/UserLogin"; // Component for user login
import UserInput from "./components/UserInput"; // Component for BMI data input
import Result from "./components/Result"; // Component for displaying BMI results
import Usernav from "./components/Usernav"; // Component for user navigation

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route
          path="/input"
          element={
            <>
              <Usernav />
              <UserInput />
            </>
          }
        />
        <Route
          path="/result"
          element={
            <>
              <Usernav />
              <Result />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
