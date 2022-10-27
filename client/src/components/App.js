import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import EssayList from "../pages/EssayList";
import NewEssay from "../pages/NewEssay";
import EssayReview from "../pages/EssayReview";
import IndividualEssay from "../pages/IndividualEssay";
import ReviewedEssay from "../pages/ReviewedEssay";
import "../styles/App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  //if user is already logged in
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/new">
            <NewEssay user={user} />
          </Route>
          <Route path="/my-essays">
            <EssayList />
          </Route>

          <Route path="/review/:id">
            <IndividualEssay />
          </Route>

          <Route path="/my-essay/:essay">
            <ReviewedEssay />
          </Route>
          <Route path="/">
            <EssayReview />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
