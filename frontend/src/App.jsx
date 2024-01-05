import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import Navbar from "./components/Navbar";
import { menuItems } from "./utilities/constants";
import RouteGuard from "./utilities/RouteGuard";
import { getYear } from "./utilities/dates";
import { DataProvider } from './utilities/DataContext';
import HomePage from './pages/HomePage';
import CompaniesPage from './pages/CompaniesPage';
import EducationPage from './pages/EducationPage';
import ProjectsPage from './pages/ProjectsPage';
import HobbiesPage from './pages/HobbiesPage';
import ExperiencePage from './pages/ExperiencePage';
import Login from './components/Login';
import ResumePage from './pages/ResumePage';

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
import './styles/ResumePage.css';
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
import './styles/AddRole.css';
import './styles/AddCourse.css';
import './styles/EditRole.css';
import './styles/EditCourse.css';
import './styles/EditSnippet.css';

const amplifyConfig = {
  Auth: {
    mandatorySignIn: false,
    region: import.meta.env.VITE_APP_REGION,
    userPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_APP_USER_POOL_CLIENT_ID,
    authenticator: {
      signIn: {
        emailLabel: 'Enter your email address',
      },
    },
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

  const componentMap = {
    HomePage,
    CompaniesPage,
    EducationPage,
    ProjectsPage,
    HobbiesPage,
    ExperiencePage,
  };

  const menuItemsWithComponents = menuItems.map(({ route, element, ...rest }, index) => ({
    route,
    element: componentMap[element], 
    ...rest,
    key: index, 
  }));

  const {user} = useAuthenticator((context) => [context.user]);

  console.log('user', user);

  return (
    <BrowserRouter>
      <DataProvider>
        <Navbar />
        <main>
          <div className="App">
            <div className="container">
              <div className="wrapper">
                <Routes>
                  {user ? (
                    <>
                      {menuItemsWithComponents.map(({ route, element: Element, key }) => (
                        <Route
                          key={key}
                          path={route}
                          element={<RouteGuard><Element /></RouteGuard>}
                        />
                      ))}
                      <Route path="/resume" element={<ResumePage />} />
                      <Route path="/login" element={<Login />} />
                    </>
                  ) : (
                    <>
                      <Route path="/" element={<Login />} />
                      <Route path="/login" element={<Login />} />
                    </>
                  )}
                  
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
