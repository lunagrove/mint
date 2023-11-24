import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import Login from "../components/Login";
import Experience from "../components/Experience";
import Card from "../components/Card";
import Snippet from "../components/Snippet";
import { getYear } from "../utilities/dates";
import { Auth, API } from "aws-amplify";
import { cardTypes } from "../utilities/constants";
import { FaSpinner } from "react-icons/fa";

function HomePage() {

  const [snippets, setSnippets] = useState([]);
  const [profile, setProfile] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingSnippets, setLoadingSnippets] = useState(true);
  const [loadingSkills, setLoadingSkills] = useState(true);

  const {user} = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchSnippets();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchSkills();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const session = await Auth.currentSession();
      const token = session.getAccessToken().getJwtToken();
      const response = await API.get("api", "/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.profile) {       
        const res = await API.post("api", "/user", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: {
            userId: user.attributes.sub,
            email: user.attributes.email
            }
          });
      }
      setProfile(response.profile);
      setLoadingProfile(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  const fetchSkills = async () => {
    try {
      const session = await Auth.currentSession();
      const token = session.getAccessToken().getJwtToken();
      const response = await API.get("api", "/skills", {
        headers: {
          Authorization: `Bearer ${token}`  
        }
      });
      setSkills(response.skills);
      setLoadingSkills(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefreshProfile = () => {
    fetchProfile();
  };

  const handleRefreshSkills = () => {
    fetchSkills();
  };

  return (
    <div className="App">
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
                        snippets.map((snippet) =>
                          <Snippet key={snippet.experienceid}
                                   snippet={snippet} />)
                      ) : (
                        <h2>You have no snippets saved. Try adding some snippets!</h2>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="card-grid">
                {cardTypes.map((cardType, index) => (
                  <Card key={index}
                        cardType={cardType}
                        cardNumber={index}
                        profile={profile}
                        loadingProfile={loadingProfile}
                        skills={skills}
                        loadingSkills={loadingSkills}
                        refreshProfile={handleRefreshProfile}
                        refreshSkills={handleRefreshSkills} />
                ))} 
              </div>
            </>
            )}
          </div>
        </div>
      <footer>
        <p className="footer-text">&copy; {getYear()} holmesgroup</p>
      </footer>
    </div>
  );
}
  
  export default HomePage;