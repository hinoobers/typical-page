import { Fragment, useEffect } from "react";
import MainHeader from "./components/MainHeader/MainHeader";
import Login from "./components/Login/Login";
import { useState } from "react";
import Home from "./components/Home/Home";

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    if(JSON.parse(localStorage.getItem('isLoggedUser')) === true) {
      return JSON.parse(localStorage.getItem('isLoggedUser')).isLogged;
    } else {
      return false;
    }
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('isLoggedUser'));
    if(stored !== null) {
      if(stored.isLogged) {
        setLoggedIn(true);
      }
    }
  });

  const loginHandler = (email, password) => {
    console.log("handling")
    localStorage.setItem('isLoggedUser', JSON.stringify({isLogged: true, username: email}));
    setLoggedIn(true);
  }

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedUser');
    setLoggedIn(false);
  }

  return (
  <Fragment>
    <MainHeader isAuthenticated={loggedIn} onLogout={logoutHandler}/>
    <main>
      {!loggedIn && <Login onLogin={loginHandler}></Login>}
      {loggedIn && <Home/>}
    </main>
  </Fragment>)
}

export default App;