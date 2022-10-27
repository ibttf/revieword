import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../styles/logo-no-background.png";
import "../styles/Navbar.css";
function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  if (user) {
    return (
      <div className="top-page">
        <div className="top-page-img-container">
          <Link to="/">
            <img src={logo} className="top-page-img"></img>
          </Link>
        </div>
        <div className="navbar">
          <nav>
            <Link to="/review">
              <button className="navbar-btn">Review</button>
            </Link>
            <Link to="/new">
              <button className="navbar-btn">Submit</button>
            </Link>
            <Link to="/my-essays">
              <button className="navbar-btn">My Essays</button>
            </Link>
            <Link to="/">
              <button className="navbar-btn" onClick={handleLogoutClick}>
                Logout
              </button>
            </Link>
          </nav>
        </div>
      </div>
    );
  } else {
    return (
      <div className="top-page">
        <div>
          <Link to="/">
            <img src={logo} className="top-page-img"></img>
          </Link>
        </div>
        <div className="navbar">
          <nav>
            <Link to="/login">
              <button className="navbar-btn">Review</button>
            </Link>
            <Link to="/login">
              <button className="navbar-btn">Submit</button>
            </Link>
            <Link to="/login">
              <button className="navbar-btn">My Essays</button>
            </Link>
            <Link to="/login">
              <button className="navbar-btn">Log in</button>
            </Link>
          </nav>
        </div>
      </div>
    );
  }
}

export default NavBar;
