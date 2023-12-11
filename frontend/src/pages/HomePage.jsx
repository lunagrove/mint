import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import ExperienceBanner from "../components/ExperienceBanner";
import Card from "../components/Card";
import Snippet from "../components/Snippet";
import { Auth, API } from "aws-amplify";
import { cardTypes, MAX_SNIPPETS } from "../utilities/constants";
import { FaSpinner } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { useData } from '../utilities/DataContext';
import { fetchProfile, fetchIntro, fetchSnippets, fetchSkills, fetchEducation, fetchCompanies,
         fetchHobbies, fetchProjects } from "../utilities/fetchData";

function HomePage() {

  const { userData, updateUserData } = useData();

  const [loadingProfile, setLoadingProfile] = useState(!userData.profile.userid ? true : false);
  const [loadingIntro, setLoadingIntro] = useState(!userData.profile.userid ? true : false);
  const [loadingSnippets, setLoadingSnippets] = useState(!userData.profile.userid && userData.snippets.length === 0 ? true : false);
  const [loadingSkills, setLoadingSkills] = useState(!userData.profile.userid ? true : false);
  const [loadingEducation, setLoadingEducation] = useState(!userData.profile.userid && userData.education.length === 0 ? true : false);
  const [loadingCompanies, setLoadingCompanies] = useState(!userData.profile.userid && userData.companies.length === 0 ? true : false);
  const [loadingHobbies, setLoadingHobbies] = useState(!userData.profile.userid && userData.hobbies.length === 0 ? true : false);
  const [loadingProjects, setLoadingProjects] = useState(!userData.profile.userid && userData.projects.length === 0 ? true : false);
  const [isSpinningProfile, setIsSpinningProfile] = useState(false);
  const [isSpinningIntro, setIsSpinningIntro] = useState(false);
  const [isSpinningSnippets, setIsSpinningSnippets] = useState(false);
  const [isSpinningSkills, setIsSpinningSkills] = useState(false);
  const [isSpinningEducation, setIsSpinningEducation] = useState(false);
  const [isSpinningCompanies, setIsSpinningCompanies] = useState(false);
  const [isSpinningHobbies, setIsSpinningHobbies] = useState(false);
  const [isSpinningProjects, setIsSpinningProjects] = useState(false);
  const [snippetCount, setSnippetCount] = useState(0);

  const {user} = useAuthenticator((context) => [context.user]);

  const handleUpdateData = (dataType, newData) => {
    updateUserData((prevUserData) => ({
        ...prevUserData,
        [dataType]: newData       
    }));
  };

  /* useEffect(() => {
    console.log('userData after update: ', userData);
  }, [userData]); */

  useEffect(() => {
    if (user && !userData.profile.userid) {
        fetchData("profile");
        fetchData("intro");
        if (userData.snippets && userData.snippets.length === 0) {
          fetchData("snippets");
        }
        fetchData("skills");
        if (userData.education && userData.education.length === 0) {
          fetchData("education");
        }
        if (userData.companies && userData.companies.length === 0) {
          fetchData("companies");
        }
        if (userData.hobbies && userData.hobbies.length === 0) {
          fetchData("hobbies");
        }
        if (userData.projects && userData.projects.length === 0) {
          fetchData("projects");
        }
    }  
  }, []);

  useEffect(() => {
    if (userData.snippets) {
        setSnippetCount(userData.snippets.length);
    }
  }, [userData.snippets]);

  useEffect(() => {
    if (isSpinningProfile) {
      fetchData("profile");
    }
  }, [isSpinningProfile]);

  useEffect(() => {
    if (isSpinningIntro) {
      fetchData("intro");
    }
  }, [isSpinningIntro]);

  useEffect(() => {
    if (isSpinningSnippets) {
      fetchData("snippets");
    }
  }, [isSpinningSnippets]);

  useEffect(() => {
    if (isSpinningSkills) {
      fetchData("skills");
    }
  }, [isSpinningSkills]);

  useEffect(() => {
    if (isSpinningEducation) {
      fetchData("education");
    }
  }, [isSpinningEducation]);

  useEffect(() => {
    if (isSpinningCompanies) {
      fetchData("companies");
    }
  }, [isSpinningCompanies]);

  useEffect(() => {
    if (isSpinningHobbies) {
      fetchData("hobbies");
    }
  }, [isSpinningHobbies]);

  useEffect(() => {
    if (isSpinningProjects) {
      fetchData("projects");
    }
  }, [isSpinningProjects]);

  const fetchData = async (dataType) => {
    if (dataType === "profile") {
      const profile = await fetchProfile();
      if (profile) {
        setIsSpinningProfile(false);
        setLoadingProfile(false);
        handleUpdateData('profile', profile);
      }
    }
    if (dataType === "intro") {
      const statements = await fetchIntro();
      if (statements) {
        setIsSpinningIntro(false);
        setLoadingIntro(false);
        handleUpdateData('intro', statements);
      }
    }
    if (dataType === "snippets") {
      const snippets = await fetchSnippets();
      if (snippets) {
        setIsSpinningSnippets(false);
        setLoadingSnippets(false);
        handleUpdateData('snippets', snippets);
      }
    }
    if (dataType === "skills") {
      const skills = await fetchSkills();
      if (skills) {
        setIsSpinningSkills(false);
        setLoadingSkills(false);
        handleUpdateData('skills', skills);
      }
    }
    if (dataType === "education") {
      const education = await fetchEducation();
      if (education) {
        setIsSpinningEducation(false);
        setLoadingEducation(false);
        handleUpdateData('education', education);
      }
    }
    if (dataType === "companies") {
      const companies = await fetchCompanies();
      if (companies) {
        setIsSpinningCompanies(false);
        setLoadingCompanies(false);
        handleUpdateData('companies', companies);
      }
    }
    if (dataType === "hobbies") {
      const hobbies = await fetchHobbies();
      if (hobbies) {
        setIsSpinningHobbies(false);
        setLoadingHobbies(false);
        handleUpdateData('hobbies', hobbies);
      }
    }
    if (dataType === "projects") {
      const projects = await fetchProjects();
      if (projects) {
        setIsSpinningProjects(false);
        setLoadingProjects(false);
        handleUpdateData('projects', projects);
      }
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

  const handleRefreshHobbies = () => {
    setLoadingHobbies(true);
    setIsSpinningHobbies(true);
  };

  const handleRefreshProjects = () => {
    setLoadingProjects(true);
    setIsSpinningProjects(true);
  };

  return (
    <>
      <div className="snippet-container">
        <ExperienceBanner snippetCount={snippetCount}/>
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
                refreshCompanies={handleRefreshCompanies}
                loadingHobbies={loadingHobbies}
                refreshHobbies={handleRefreshHobbies}
                loadingProjects={loadingProjects}
                refreshProjects={handleRefreshProjects} />
        ))} 
      </div>
    </>      
  );
}
  
export default HomePage;