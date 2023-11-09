import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import RouteGuard from "./RouteGuard";
import { Auth } from "aws-amplify";

import Login from "./Login";
import { getYear } from "./utilities/dates";

import './App.css';

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
  console.log('user', user);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user && (
          <>
          <li>
              <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="#" onClick={handleSignOut}>Logout</Link>
          </li>
          {user && ( 
            <p className="welcome-msg">Welcome {user.attributes.email}</p>
          )}
          </>
        
        )}
        
      </ul>
    </nav>
  )
}

function App() {
  return (
    <div className="App">
        <Authenticator.Provider>
          <BrowserRouter>
            <NavBar></NavBar>
            <div className="container">
              <div className="wrapper">
                <div className="logo-container">
                  <img className="logo-main" src="./logo-main.png" alt="Mint logo"></img>
                </div>
                <main>
                  <Login></Login>
                </main>
              </div>
            </div>
          </BrowserRouter>
        </Authenticator.Provider>
      <footer>
        <p className="footer-text">&copy; {getYear()} holmesgroup</p>
      </footer>
    </div>
  );
}

export default App;
