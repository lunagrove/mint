import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import HomePage from './pages/HomePage';
import Navbar from "./components/Navbar";
import { menuItems } from "./utilities/constants";
import RouteGuard from "./utilities/RouteGuard";
import { getYear } from "./utilities/dates";
import { DataProvider } from './utilities/DataContext';
import CompaniesPage from './pages/CompaniesPage';
import EducationPage from './pages/EducationPage';
import ProjectsPage from './pages/ProjectsPage';
import HobbiesPage from './pages/HobbiesPage';
import ExperiencePage from './pages/ExperiencePage';
import LoginPage from './pages/LoginPage';

import './styles/App.css';
import './styles/Amplify.css';
import './styles/Card.css';
import './styles/CardProfile.css';
import './styles/CardSkills.css';
import './styles/CardEducation.css';
import './styles/CardCompanies.css';
import './styles/CardProjects.css';
import './styles/CardHobbies.css';
import './styles/EditModal.css';
import './styles/Form.css';
import './styles/Tips.css';
import './styles/Icons.css';
import './styles/Navbar.css';
import './styles/Footer.css';
import './styles/EditIntro.css';
import './styles/EditSkills.css';
import './styles/HomePage.css';
import './styles/EducationPage.css';
import './styles/CompaniesPage.css';
import './styles/HobbiesPage.css';
import './styles/ProjectsPage.css';
import './styles/ExperiencePage.css';
import './styles/Project.css';
import './styles/AddProject.css';
import './styles/Hobby.css';
import './styles/AddHobby.css';
import './styles/Experience.css';
import './styles/AddSnippet.css';
import './styles/AddCompany.css';
import './styles/AddEducation.css';
import './styles/Companies.css';
import './styles/Education.css';
import './styles/Dialog.css';
import './styles/SelectYear.css';

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
        <DataProvider>
          <Navbar />
          <main>
            <LoginPage />
          </main>
        </DataProvider>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <DataProvider>
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
      </DataProvider>
    </BrowserRouter>
  );
}  

export default App;
