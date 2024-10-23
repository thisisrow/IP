import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          BMI Calculator
        </Link>
        <div className="ml-auto">
          <Link className="btn btn-outline-primary mr-2" to="/register">
            Register
          </Link>
          <Link className="btn btn-outline-primary" to="/login">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
