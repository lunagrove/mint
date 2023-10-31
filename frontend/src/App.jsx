import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

import Login from "./Login";
import { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import { getYear } from "./utilities/dates";

const amplifyConfig = {
  Auth: {
    mandatorySignIn: false,
    region: import.meta.env.VITE_APP_REGION,
    userPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_APP_USER_POOL_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: "api",
        endpoint: import.meta.env.VITE_APP_API_URL,
        region: import.meta.env.VITE_APP_REGION,
      },
    ],
  },
};
Amplify.configure(amplifyConfig);

const handleSignOut = async () => {
  try {
    await Auth.signOut();
    window.location.href = '/';
  } catch (error) {
    alert(error);
  }
};

function NavBar() {
  const {user} = useAuthenticator((context) => [context.user]);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user? (
          <>
          <li>
              <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="#" onClick={handleSignOut}>Logout</Link>
          </li>
          {user && ( 
            <p className="welcome-msg">Welcome {user.username}</p>
          )}
          </>
        ) : (
          <li>
              <Link to="/login">Login</Link>
          </li>
        )}
        
      </ul>
    </nav>
  )
}

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="logo-container">
          <img className="logo-main" src="./logo-main.png" alt="Mint logo"></img>
        </div>
        <Authenticator.Provider>
          <BrowserRouter>
            <NavBar></NavBar>
            <main>
              <Routes>     
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
          </BrowserRouter>
        </Authenticator.Provider>
      </div>
      <footer>
        <p className="footer-text">&copy; {getYear()} holmesgroup</p>
      </footer>
    </div>
  )
}

export default App;
