import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import EssayList from "../pages/EssayList";
import NewEssay from "../pages/NewEssay";
import EssayReview from "../pages/EssayReview";
import IndividualEssay from "../pages/IndividualEssay";
import ReviewedEssay from "../pages/ReviewedEssay";
import UnreviewedEssay from "../pages/UnreviewedEssay";
import Home from "../pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
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

  return (
    <>
      <main>
        <Switch>
          <Route path="/new">
            <NavBar user={user} setUser={setUser} />
            <NewEssay user={user} />
          </Route>
          <Route path="/my-essays">
            <NavBar user={user} setUser={setUser} />
            <EssayList />
          </Route>

          <Route path="/review/:id">
            <NavBar user={user} setUser={setUser} />
            <IndividualEssay />
          </Route>

          <Route path="/my-essay/:essay">
            <NavBar user={user} setUser={setUser} />
            <ReviewedEssay />
          </Route>
          <Route path="/unreviewed-essay/:essay">
            <NavBar user={user} setUser={setUser} />
            <UnreviewedEssay />
          </Route>
          <Route path="/review">
            <NavBar user={user} setUser={setUser} />
            <EssayReview />
          </Route>
          <Route path="/login">
            <Login onLogin={setUser} />
          </Route>

          <Route path="/">
            <NavBar user={user} setUser={setUser} />
            <Home user={user} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
