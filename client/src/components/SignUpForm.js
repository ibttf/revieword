import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import config from "../baseUrl"
function SignUpForm({ onLogin }) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSignup(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch(`${config.baseUrl}/users/signup`, 
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, passwordConfirmation }),
      }).then(r=>r.json())
      .then(data=>{
        localStorage.setItem('accessToken', data.accessToken);
        history.push("/");

      }
    ).catch(err=>setErrors([err.error]))
    setIsLoading(false);

  };


  return (
    <div className="login-form">
      <h1>Create Account</h1>
      <h2>Please enter your details to make an account.</h2>
      <form onSubmit={handleSignup}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />

        <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>

        <div className="errors">
          {errors.map((err) => (
            <div key={err}>Oops! {err}</div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
