import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark ">
      <div className="container">
        <div className="ml-auto">
          <Link className="btn btn-outline-primary mr-2" to="/input">
            Enter your details
          </Link>
          <Link className="btn btn-outline-primary" to="/result">
            Result
          </Link>
          <button className="btn btn-secondary mr-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
