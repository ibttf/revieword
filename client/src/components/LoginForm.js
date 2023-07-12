import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/LoginForm.css";
import config from "../baseUrl"
function LoginForm({ onLogin }) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch(`${config.baseUrl}/users/login`, 
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      }).then(r=>r.json())
      .then(data=>{
        localStorage.setItem('accessToken', data.accessToken);
        history.push("/");
        window.location.reload();

      }
    ).catch(err=>setErrors([err.error]))
    setIsLoading(false);

  };

  return (
    <div className="login-form">
      <h1>Welcome back</h1>
      <h2>Welcome back! Please enter your details.</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="username"
          value={username}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          id="password"
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">{isLoading ? "Loading..." : "Sign In"}</button>

        <div className="errors">
          {errors ? (
            errors.map((err) => <div key={err}>Oops! {err}</div>)
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
