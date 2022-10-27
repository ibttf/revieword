import React, { useState } from "react";
import logo from "../styles/logo-no-background.png";
import { useHistory } from "react-router-dom";
function LoginForm({ onLogin }) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
        history.push("/");
      } else {
        r.json().then((err) => {
          setErrors(err.errors);
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        autoComplete="on"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">{isLoading ? "Loading..." : "Login"}</button>

      <div>
        {errors ? errors.map((err) => <div key={err}>{err}</div>) : <></>}
      </div>
    </form>
  );
}

export default LoginForm;
