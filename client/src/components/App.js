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
import Loading from "../pages/Loading"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/App.css";
import config from "../baseUrl"
function App() {
  const [user, setUser] = useState(null);
  const [isLoading,setIsLoading]=useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message,setMessage]=useState("")

  useEffect(() => {
    setIsLoading(true);
    // auto-login
    checkLoginStatus();
    setIsLoading(false);
  }, []);


  const checkLoginStatus = async () => {
    try {
      const response = await fetch(`${config.baseUrl}/users/current`, {
        headers: { 'Content-Type': 'application/json', 
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });

      if (response.ok) {
        setLoggedIn(true);
        const data = await response.json();
        setUser(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading){
    return <Loading />
  }
  return (
    <>
      <main>
        <Switch>
          <Route path="/new">
            <NavBar user={user} />
            <NewEssay user={user} />
          </Route>
          <Route path="/my-essays">
            <NavBar user={user} />
            <EssayList />
          </Route>

          <Route path="/review/:id">
            <NavBar user={user} />
            <IndividualEssay />
          </Route>

          <Route path="/my-essay/:essay">
            <NavBar user={user} />
            <ReviewedEssay />
          </Route>
          <Route path="/unreviewed-essay/:essay">
            <NavBar user={user} />
            <UnreviewedEssay />
          </Route>
          <Route path="/review">
            <NavBar user={user} />
            <EssayReview />
          </Route>
          <Route path="/login">
            <Login onLogin={setUser} />
          </Route>

          <Route path="/">
            <NavBar user={user} />
            <Home user={user} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
