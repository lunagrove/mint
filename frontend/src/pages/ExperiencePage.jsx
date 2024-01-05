import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import { FaSpinner } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { useState, useEffect } from "react";
import IconButton from "../components/IconButton";
import Experience from "../components/Experience";
import AddSnippet from '../components/AddSnippet';
import { useData } from '../utilities/DataContext';
import { fetchSnippets, fetchSkills, fetchEducation, fetchCompanies,
         fetchHobbies, fetchProjects } from "../utilities/fetchData";

function ExperiencePage() {

    const {user} = useAuthenticator((context) => [context.user]);
    const { userData, updateUserData } = useData();

    const [loadingSnippets, setLoadingSnippets] = useState(false);
    const [isSpinningSnippets, setIsSpinningSnippets] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [snippetCount, setSnippetCount] = useState(0);

    useEffect(() => {
        console.log('userData in experience page: ', userData);
    }, [userData]);

    useEffect(() => {
        if (user && userData.snippets && userData.snippets.length === 0) {
            setLoadingSnippets(true);
            fetchData("snippets");
        }  
        if (user && userData.skills && userData.skills.length === 0) {
            fetchData("skills");
        }
        if (user && userData.hobbies && userData.hobbies.length === 0) {
            fetchData("hobbies");
        }
        if (user && userData.projects && userData.projects.length === 0) {
            fetchData("projects");
        }
        if (user && userData.companies && userData.companies.length === 0) {
            fetchData("companies");
        }
        if (user && userData.education && userData.education.length === 0) {
            fetchData("education");
        }  
    }, []);

    useEffect(() => {
        if (userData.snippets) {
            setSnippetCount(userData.snippets.length);
        }
    }, [userData.snippets]);

    const handleAddSnippet = () => {
        setIsPanelOpen(true);
    };

    const handleDelete = async (snippetId) => {
        try {
            await API.del("api", `/snippet/${snippetId}`, {
                headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                }
            });
              
            await updateUserData((prevUserData) => {
                return {
                    ...prevUserData,
                    snippets: prevUserData.snippets.filter(snippet => snippet.experienceid !== snippetId),
                };
            });  
        }
        catch (error) {
            alert(error);
        }
    };

    const handleEdit = async (snippetId, description, skillObjs, tag) => {
        let skills = [];
        if (skillObjs) {
            skills = skillObjs.map(skill => skill.value);
        }
        let tagValue = null;
        let tagType = '';
        if (tag) {
            const parts = tag.value.split('+');
            tagValue = parts[0];
            tagType = parts[1];    
        }
        try {
            const result = await API.put("api", `/snippet/${snippetId}`, {
                headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                },
                body: {
                    snippet: description,
                    skillIds: skills,
                    tagId: tagValue,
                    tagType: tagType
                }
            });
            if (result) {
                const updatedSnippet = result;
                await updateUserData((prevUserData) => {
                    return {
                        ...prevUserData,
                        snippets: prevUserData.snippets.map((snippet) =>
                            snippet.experienceid === snippetId ? { ...snippet, ...updatedSnippet } : snippet
                        )};
                });      
            }
        }
        catch (error) {
            alert(error);
        }
    };

    const handleSubmit = async (snippet, skillObjs, tag) => {
        let skills = [];
        if (skillObjs) {
            skills = skillObjs.map(skill => skill.value);
        }
        let tagValue = null;
        let tagType = '';
        if (tag) {
            const parts = tag.value.split('+');
            tagValue = parts[0];
            tagType = parts[1];    
        }
        try {
            const result = await API.post("api", "/snippet", {
                headers: {
                    Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                },
                body: {
                    snippet: snippet,
                    skillIds: skills,
                    tagId: tagValue,
                    tagType: tagType
                }
            });
            if (result) {
                const newSnippet = result.snippet;
                await updateUserData((prevUserData) => {
                    return {
                        ...prevUserData,
                        snippets: [newSnippet, ...prevUserData.snippets]
                    };
                });      
            }
        }
        catch (error) {
            alert(error);
        }
        setIsPanelOpen(false);
    };

    const handleClose = () => {
        setIsPanelOpen(false);
    };

    const handleUpdateData = (dataType, newData) => {
        updateUserData((prevUserData) => ({
            ...prevUserData,
            [dataType]: newData       
        }));
    };

    useEffect(() => {
        if (isSpinningSnippets) {
            fetchData("snippets");
        }
    }, [isSpinningSnippets]);

    const fetchData = async (dataType) => {
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
            handleUpdateData('skills', skills);
          }
        }
        if (dataType === "education") {
            const education = await fetchEducation();
            if (education) {
              handleUpdateData('education', education);
            }
        }
        if (dataType === "companies") {
            const companies = await fetchCompanies();
            if (companies) {
              handleUpdateData('companies', companies);
            }
        }
        if (dataType === "hobbies") {
            const hobbies = await fetchHobbies();
            if (hobbies) {
              handleUpdateData('hobbies', hobbies);
            }
        }
        if (dataType === "projects") {
            const projects = await fetchProjects();
            if (projects) {
              handleUpdateData('projects', projects);
            }
        }
    };

    const handleRefreshSnippets = () => {
        setLoadingSnippets(true);
        setIsSpinningSnippets(true);
    };
  
    return (
        <div className="experience-page-content">
            <div className="experience-page-heading">
                <img className="mint-leaf-medium" src="./Mint-leaf-transparent.png" alt="<Mint leaf>"/>
                <h2>Manage Experience ({snippetCount})</h2>
                <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningSnippets ? 'spin' : ''}`}
                             onClick={handleRefreshSnippets} />
            </div>

            <div className={`experience-page-panel2 ${isPanelOpen ? 'open' : 'hide'}`}>
                <div className="experience-page-add">
                    <h2>Add Snippet</h2>
                    {!isPanelOpen && (
                        <img
                            className="plus-button plus-button-medium"
                            src="./plus-icon-80x80.png"
                            alt="Plus icon"
                            onClick={handleAddSnippet}
                        />
                    )}
                </div>
                {isPanelOpen && (
                    <AddSnippet onSubmit={handleSubmit}
                                onClose={handleClose} />
                )}
            </div>

            {loadingSnippets ? (
                <div className="experience-page-list experience-page-list-loading">
                    <FaSpinner className="spin icon-large" />
                </div>
            ) : (
                <>
                    <div className="experience-page-list">
                        {userData.snippets && userData.snippets.length > 0 ? (userData.snippets.map((item) =>
                            <Experience key={item.experienceid}
                                        snippet={item}
                                        onDelete={handleDelete}
                                        onEdit={handleEdit} />)
                        ) : (
                        <h2>You have no experience snippets saved. Try adding some snippets!</h2>
                        )}
                    </div>
                </>
            )}

            <IconButton iconType="back"
                        caption="Dashboard"
                        linkTo="/"
                        size="normal" />
        </div>
  )};
  
  export default ExperiencePage;