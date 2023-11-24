import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Amplify } from "aws-amplify";
import HomePage from './pages/HomePage';
import Navbar from "./components/Navbar";
import { menuItems } from "./utilities/constants";
import RouteGuard from "./utilities/RouteGuard";
import CompaniesPage from './pages/CompaniesPage';
import EducationPage from './pages/EducationPage';
import ProjectsPage from './pages/ProjectsPage';
import HobbiesPage from './pages/HobbiesPage';
import ExperiencePage from './pages/ExperiencePage';

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
    <BrowserRouter>
      <Navbar></Navbar>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {menuItems.map(({ route, element }, index) => (
              <Route
                  key={index}
                  path={route}
                  element={<RouteGuard>{React.createElement(eval(element))}</RouteGuard>}
              />
          ))}     
          
        </Routes>
      </main>
    </BrowserRouter>
  );
}  

export default App;
