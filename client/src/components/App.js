import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import EssayList from "../pages/MyEssays";
import SubmitEssay from "../pages/SubmitEssay";
import Browse from "../pages/Browse";
import IndividualEssay from "../pages/IndividualEssay";
import ReviewedEssay from "../pages/ReviewedEssay";
import UnreviewedEssay from "../pages/UnreviewedEssay";
import Home from "../pages/Home";
import Loading from "../pages/Loading"
import ReviewingError from "../pages/ReviewingError";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/App.css";
import config from "../baseUrl"
function App() {
  const [user, setUser] = useState(null);
  const [isLoading,setIsLoading]=useState(true);
  const [stopScroll,setStopScroll]=useState(false);
  const history=useHistory();
  useEffect(() => {
    setIsLoading(true);
    // auto-login
    checkLoginStatus();

  }, []);


  const checkLoginStatus = async () => {
    try {
      const response = await fetch(`${config.baseUrl}/users/current`, {
        headers: { 'Content-Type': 'application/json', 
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    }catch{
      
    }
    setIsLoading(false);
  };

  if (isLoading){
    return <Loading />
  }
  if (!user || !user.reviewingEssayId){
    return (
      <>
        <main >
          <Switch>
            <Route path="/new">
              <NavBar user={user} />
              <SubmitEssay user={user} />
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
              <Browse setStopScroll={setStopScroll}/>
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
  }else{
    
    history.push(`/review/${user.reviewingEssayId}`)
    return (
      <>
        <main >
          <Switch>
            <Route path="/review/:id">
              <NavBar user={user} />
              <IndividualEssay />
            </Route>
            <Route path="/">
              <NavBar user={user}/>
              <ReviewingError id={user.reviewingEssayId}/>
            </Route>
          </Switch>
        </main>
      </>
    )
  }
}

export default App;
