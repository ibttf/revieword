import { useState } from "react";
import logo from "../styles/logo-no-background.png";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import "../styles/Login.css";
function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <img src={logo} className="login-img"></img>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <div />
          <p>
            Don't have an account? &nbsp;
            <button onClick={() => setShowLogin(false)}>Sign Up</button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <div />
          <p>
            Already have an account? &nbsp;
            <button onClick={() => setShowLogin(true)}>Log In</button>
          </p>
        </>
      )}
    </>
  );
}

export default Login;
