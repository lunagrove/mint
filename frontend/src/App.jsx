import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";

import RouteGuard from "./RouteGuard";
import { Auth } from "aws-amplify";
import Navbar from "./Navbar";
import Login from "./Login";
import Card from "./Card";
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

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <div className="container">
          <div className="wrapper">
            <main>
              <Login></Login>
              <div className="card-grid">
                <Card cardNumber={1} />
                <Card cardNumber={2} />
                <Card cardNumber={3} />
                <Card cardNumber={4} />
                <Card cardNumber={5} />
                <Card cardNumber={6} />
              </div>
            </main>
          </div>
        </div>
      </BrowserRouter>
      <footer>
        <p className="footer-text">&copy; {getYear()} holmesgroup</p>
      </footer>
    </div>
  );
}

export default App;
