import { useState } from "react";
import logo from "../styles/logo-no-background.png";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { useHistory } from "react-router-dom";
import "../styles/Login.css";
function Login({ onLogin }) {
  const history = useHistory();
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <div />
          <p>
            Don't have an account? &nbsp;
            <button
              onClick={() => {
                setShowLogin(false);
              }}
            >
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <div />
          <p>
            Already have an account? &nbsp;
            <button
              onClick={() => {
                setShowLogin(false);
                history.push("/");
              }}
            >
              Log In
            </button>
          </p>
        </>
      )}
    </>
  );
}

export default Login;
