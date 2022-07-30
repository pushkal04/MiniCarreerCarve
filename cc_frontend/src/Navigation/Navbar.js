import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <a className="navbar-brand" href="#">
        Booking System
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to = "/">
            <a className="nav-link" href="#">
              Add Mentor
            </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link to = '/book'>
            <a className="nav-link" href="#">
              Book Timing
            </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;