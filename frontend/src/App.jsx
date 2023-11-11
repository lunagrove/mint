import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Login from "./Login";
import Card from "./Card";
import Snippet from "./Snippet";
import { getYear } from "./utilities/dates";
import { Auth, API } from "aws-amplify";

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

  const cardTypes = [
    'Profile',
    'Companies and Roles',
    'Education',
    'Side Projects',
    'Experience',
    'Skills'
  ]

  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const session = await Auth.currentSession();
        const token = session.getAccessToken().getJwtToken();
        const response = await API.get("api", "/snippets", {
          headers: {
            Authorization: `Bearer ${token}`  
        }
        });
        setSnippets(response.snippets);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSnippets();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <div className="container">
          <div className="wrapper">
              <Login></Login>
              <div className="card-grid">
                {cardTypes.map((cardType) => (
                  <Card key={cardType} cardType={cardType} />
                ))} 
              </div>
              <div className="snippet-container">
                <h3>Most Recent Snippets</h3>
                {snippets && snippets.length > 0 ? (
                  snippets.map((snippet) => <Snippet key={snippet} snippet={snippet} />)
                ) : (
                  <Snippet snippet='No snippets available. Add some snippets!'/>
                )}
              </div>
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
