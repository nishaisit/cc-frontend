import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo-container">
        <div className="logo">
          <img
            src="https://i.pinimg.com/736x/d8/85/ec/d885ecb56a01f00d9980b82f8c945459.jpg"
            alt="Code Collab Logo"
            className="logo-img"
          />
          <h3 className="logo-text">Code-Collab</h3>
        </div>
      </Link>

      <div className="nav-links">
        <Link to="repo/create" className="nav-link">
          <p>Create a Repository</p>
        </Link>
        <Link to="/profile" className="nav-link">
          <p>Profile</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
