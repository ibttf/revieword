import React from "react";
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

  return (
    <div className="navbar">
      <div>
        <Link to="/">
          <img src={logo} className="navbar-img"></img>
        </Link>
      </div>
      <nav>
        <Link to="/">
          <button className="navbar-btn">Review</button>
        </Link>
        <Link to="/new">
          <button className="navbar-btn">Submit</button>
        </Link>
        <Link to="/my-essays">
          <button className="navbar-btn">My Essays</button>
        </Link>
        <button className="navbar-btn" onClick={handleLogoutClick}>
          Logout
        </button>
      </nav>
    </div>
  );
}

export default NavBar;
