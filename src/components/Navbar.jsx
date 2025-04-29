import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <div>
          <img
            src="https://i.pinimg.com/736x/bc/9f/fe/bc9ffe18ff9b3c4633243705d325b0c7.jpg"
            alt="Black Bow Logo"
          />
          <h3>Code-Collab</h3>
        </div>
      </Link>
      <div>
        <Link to="/create">
          <p>Create a Repository</p>
        </Link>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;