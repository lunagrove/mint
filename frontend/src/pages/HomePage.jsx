import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import Experience from "../components/Experience";
import Card from "../components/Card";
import Snippet from "../components/Snippet";
import { Auth, API } from "aws-amplify";
import { cardTypes, MAX_SNIPPETS } from "../utilities/constants";
import { FaSpinner } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { useData } from '../utilities/DataContext';

function HomePage() {

  const { userData, updateUserData } = useData();

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingIntro, setLoadingIntro] = useState(true);
  const [loadingSnippets, setLoadingSnippets] = useState(true);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [loadingEducation, setLoadingEducation] = useState(true);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [isSpinningProfile, setIsSpinningProfile] = useState(false);
  const [isSpinningIntro, setIsSpinningIntro] = useState(false);
  const [isSpinningSnippets, setIsSpinningSnippets] = useState(false);
  const [isSpinningSkills, setIsSpinningSkills] = useState(false);
  const [isSpinningEducation, setIsSpinningEducation] = useState(false);
  const [isSpinningCompanies, setIsSpinningCompanies] = useState(false);

  const {user} = useAuthenticator((context) => [context.user]);

  const handleUpdateData = (dataType, newData) => {
    updateUserData((prevUserData) => {
      switch (dataType) {
        case 'profile':
          return {
            ...prevUserData,
            profile: {
              ...prevUserData.profile,
              ...newData,
            },
          };
        case 'intro':
          return {
            ...prevUserData,
            intro: newData,
          };
        case 'snippets':
          return {
            ...prevUserData,
            snippets: newData,
          };
        case 'skills':
          return {
            ...prevUserData,
            skills: newData,
          };
        case 'education':
          return {
            ...prevUserData,
            education: newData,
          };
        case 'companies':
          return {
            ...prevUserData,
            companies: newData,
          };
        default:
          return prevUserData;
      }
    });
  };

  useEffect(() => {
    console.log('userData after update: ', userData);
  }, [userData]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchIntro();
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

  useEffect(() => {
    if (user) {
      fetchEducation();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchCompanies();
    }
  }, [user]);

  useEffect(() => {
    if (isSpinningProfile) {
      fetchProfile();
    }
  }, [isSpinningProfile]);

  useEffect(() => {
    if (isSpinningIntro) {
      fetchIntro();
    }
  }, [isSpinningIntro]);

  useEffect(() => {
    if (isSpinningSnippets) {
      fetchSnippets();
    }
  }, [isSpinningSnippets]);

  useEffect(() => {
    if (isSpinningSkills) {
      fetchSkills();
    }
  }, [isSpinningSkills]);

  useEffect(() => {
    if (isSpinningEducation) {
      fetchEducation();
    }
  }, [isSpinningEducation]);

  useEffect(() => {
    if (isSpinningCompanies) {
      fetchCompanies();
    }
  }, [isSpinningCompanies]);

  const fetchProfile = async () => {
    let response;
    try {
      const session = await Auth.currentSession();
      const token = session.getAccessToken().getJwtToken();
      response = await API.get("api", "/profile", {
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
    } catch (error) {
      console.log(error);
    } finally {
      setIsSpinningProfile(false);
      setLoadingProfile(false);
      handleUpdateData('profile', response.profile);
    }
  };

  const fetchIntro = async () => {
    let response;
    try {
      const session = await Auth.currentSession();
      const token = session.getAccessToken().getJwtToken();
      response = await API.get("api", "/intro", {
        headers: {
          Authorization: `Bearer ${token}`  
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSpinningIntro(false);
      setLoadingIntro(false);
      handleUpdateData('intro', response.statements);
    }
  };

  const fetchSnippets = async () => {
    let response;
    try {
      const session = await Auth.currentSession();
      const token = session.getAccessToken().getJwtToken();
      response = await API.get("api", "/snippets", {
        headers: {
          Authorization: `Bearer ${token}`  
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSpinningSnippets(false);
      setLoadingSnippets(false);
      handleUpdateData('snippets', response.snippets);
    }
  };

  const fetchSkills = async () => {
    let response;
    try {
      const session = await Auth.currentSession();
      const token = session.getAccessToken().getJwtToken();
      response = await API.get("api", "/skills", {
        headers: {
          Authorization: `Bearer ${token}`  
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSpinningSkills(false);
      setLoadingSkills(false);
      handleUpdateData('skills', response.skills);
    }
  };

  const fetchEducation = async () => {
    let response;
    try {
      const session = await Auth.currentSession();
      const token = session.getAccessToken().getJwtToken();
      response = await API.get("api", "/education", {
        headers: {
          Authorization: `Bearer ${token}`  
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSpinningEducation(false);
      setLoadingEducation(false);
      handleUpdateData('education', response.education);
    }
  };

  const fetchCompanies = async () => {
    let response;
    try {
      const session = await Auth.currentSession();
      const token = session.getAccessToken().getJwtToken();
      response = await API.get("api", "/companies", {
        headers: {
          Authorization: `Bearer ${token}`  
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSpinningCompanies(false);
      setLoadingCompanies(false);
      handleUpdateData('companies', response.companies);
    }
  };

  const handleRefreshProfile = () => {
    setLoadingProfile(true);
    setIsSpinningProfile(true);
  };

  const handleRefreshIntro = () => {
    setLoadingIntro(true);
    setIsSpinningIntro(true);
  };

  const handleRefreshSnippets = () => {
    setLoadingSnippets(true);
    setIsSpinningSnippets(true);
  };

  const handleRefreshSkills = () => {
    setLoadingSkills(true);
    setIsSpinningSkills(true);
  };

  const handleRefreshEducation = () => {
    setLoadingEducation(true);
    setIsSpinningEducation(true);
  };

  const handleRefreshCompanies = () => {
    setLoadingCompanies(true);
    setIsSpinningCompanies(true);
  };

  return (
    <>
      <div className="snippet-container">
        <Experience/>
        <div className="snippet-heading">
          <h3>Most Recent Snippets</h3>
          <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningSnippets ? 'spin' : ''}`}
                       onClick={handleRefreshSnippets} />
        </div>
        <div className="recent-container">
          
          {loadingSnippets ? (
            <div className="snippet-loading">
              <FaSpinner className="spin icon-large" />
            </div>
          ) : (
            <> 
              {userData.snippets && userData.snippets.length > 0 ? (
                userData.snippets.slice(0, MAX_SNIPPETS).map((snippet) =>
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
                loadingProfile={loadingProfile}               
                refreshProfile={handleRefreshProfile}
                refreshIntro={handleRefreshIntro}
                loadingSkills={loadingSkills}
                refreshSkills={handleRefreshSkills}                
                loadingEducation={loadingEducation}
                refreshEducation={handleRefreshEducation}
                loadingCompanies={loadingCompanies}
                refreshCompanies={handleRefreshCompanies} />
        ))} 
      </div>
    </>      
  );
}
  
export default HomePage;