import React from "react";
import { Link } from "react-router-dom";
import logo from "../styles/logo-no-background.png";
import "../styles/Navbar.css";

//bootstrap stuff
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


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
       <Navbar bg="light" expand="lg">
      <Container>

        <Navbar.Brand>
          <Link to="/">
            <img src={logo} className="top-page-img"></img>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/review" className="navbar-btn">Review</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/new"  className="navbar-btn">Submit</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/my-essays"  className="navbar-btn">My Essays</Link>
            </Nav.Link>
            <Nav.Link onClick={handleLogoutClick}> 
              <Link to="/"  className="navbar-btn">Logout</Link>
            </Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    )
  } else {
      return (
       <Navbar bg="light" expand="lg">
      <Container>

        <Navbar.Brand>
          <Link to="/">
            <img src={logo} className="top-page-img"></img>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link >
              <Link to="/review" className="navbar-btn">Review</Link>
            </Nav.Link>
            <Nav.Link >
              <Link to="/new"  className="navbar-btn">Submit</Link>
            </Nav.Link>
            <Nav.Link >
              <Link to="/my-essays"  className="navbar-btn">My Essays</Link>
            </Nav.Link>
            <Nav.Link onClick={handleLogoutClick}> 
              <Link to="/login"  className="navbar-btn">Login</Link>
            </Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
  }
}
 


// function NavBar({ user, setUser }) {
  // function handleLogoutClick() {
  //   fetch("/logout", { method: "DELETE" }).then((r) => {
  //     if (r.ok) {
  //       setUser(null);
  //     }
  //   });
  // }
//   if (user) {
//     return (
//       <div className="top-page">
//         <div className="top-page-img-container">
//           <Link to="/">
//             <img src={logo} className="top-page-img"></img>
//           </Link>
//         </div>
//         <div className="navbar">
//           <nav>
//             <Link to="/review">
//               <button className="navbar-btn">Review</button>
//             </Link>
//             <Link to="/new">
//               <button className="navbar-btn">Submit</button>
//             </Link>
//             <Link to="/my-essays">
//               <button className="navbar-btn">My Essays</button>
//             </Link>
//             <Link to="/">
//               <button className="navbar-btn" onClick={handleLogoutClick}>
//                 Logout
//               </button>
//             </Link>
//           </nav>
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div className="top-page">
//         <div>
//           <Link to="/">
//             <img src={logo} className="top-page-img"></img>
//           </Link>
//         </div>
//         <div className="navbar">
//           <nav>
//             <Link to="/login">
//               <button className="navbar-btn">Review</button>
//             </Link>
//             <Link to="/login">
//               <button className="navbar-btn">Submit</button>
//             </Link>
//             <Link to="/login">
//               <button className="navbar-btn">My Essays</button>
//             </Link>
//             <Link to="/login">
//               <button className="navbar-btn">Log in</button>
//             </Link>
//           </nav>
//         </div>
//       </div>
//     );
//   }
// }

export default NavBar;
