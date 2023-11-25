import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import HomePage from './pages/HomePage';
import Navbar from "./components/Navbar";
import { menuItems } from "./utilities/constants";
import RouteGuard from "./utilities/RouteGuard";
import { getYear } from "./utilities/dates";
import CompaniesPage from './pages/CompaniesPage';
import EducationPage from './pages/EducationPage';
import ProjectsPage from './pages/ProjectsPage';
import HobbiesPage from './pages/HobbiesPage';
import ExperiencePage from './pages/ExperiencePage';
import LoginPage from './pages/LoginPage';

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

  const {user} = useAuthenticator((context) => [context.user]);

  if (!user) {
    return (
      <BrowserRouter>
        <Navbar />
        <main>
          <LoginPage />
        </main>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <main>
        <div className="App">
          <div className="container">
            <div className="wrapper">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                {menuItems.map(({ route, element }, index) => (
                    <Route
                        key={index}
                        path={route}
                        element={<RouteGuard>{React.createElement(eval(element))}</RouteGuard>}
                    />
                ))}     
              </Routes>
            </div>
          </div>
          <footer>
            <p className="footer-text">&copy; {getYear()} holmesgroup</p>
          </footer>
        </div>
      </main>
    </BrowserRouter>
  );
}  

export default App;
