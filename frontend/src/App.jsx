import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { useState, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Navbar from "./Navbar";
import Login from "./Login";
import Experience from "./Experience";
import Card from "./Card";
import Snippet from "./Snippet";
import { getYear } from "./utilities/dates";
import { Auth, API } from "aws-amplify";
import cardTypes from "./utilities/constants";
import { FaSpinner } from "react-icons/fa";

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

  const [snippets, setSnippets] = useState([]);
  const [profile, setProfile] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingSnippets, setLoadingSnippets] = useState(true);

  const {user} = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const session = await Auth.currentSession();
        const token = session.getAccessToken().getJwtToken();
        const response = await API.get("api", "/profile", {
          headers: {
            Authorization: `Bearer ${token}`  
        }
        });
        setProfile(response.profile);
        setLoadingProfile(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [user]);

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
        setLoadingSnippets(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSnippets();
  }, [user]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <div className="container">
          <div className="wrapper">
            {!user ? (
              <Login />
            ) : (
            <>
              <div className="snippet-container">
                <Experience/>
                <h3>Most Recent Snippets</h3>
                <div className="recent-container">
                  
                  {loadingSnippets ? (
                    <div className="snippet-loading">
                      <FaSpinner className="spin icon-large" />
                    </div>
                  ) : (
                    <> 
                      {snippets && snippets.length > 0 ? (
                        snippets.map((snippet, index) =>
                          <Snippet key={index}
                                  snippet={snippet} />)
                      ) : (
                        <h2>You have no snippets saved. Try adding some snippets!</h2>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="card-grid">
                {cardTypes.map((cardType) => (
                  <Card key={cardType}
                        cardType={cardType}
                        profile={profile}
                        loading={loadingProfile} />
                ))} 
              </div>
            </>
            )}
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
