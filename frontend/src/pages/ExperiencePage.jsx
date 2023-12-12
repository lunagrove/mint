import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import { FaSpinner } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { useState, useEffect } from "react";
import IconButton from "../components/IconButton";
import Experience from "../components/Experience";
import AddSnippet from '../components/AddSnippet';
import { useData } from '../utilities/DataContext';
import { fetchSnippets, fetchSkills } from "../utilities/fetchData";

function ExperiencePage() {

    const {user} = useAuthenticator((context) => [context.user]);
    const { userData, updateUserData } = useData();

    const [loadingSnippets, setLoadingSnippets] = useState(false);
    const [isSpinningSnippets, setIsSpinningSnippets] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [snippetCount, setSnippetCount] = useState(0);

    useEffect(() => {
        if (user && userData.snippets && userData.snippets.length === 0) {
            setLoadingSnippets(true);
            fetchData("snippets");
        }  
        if (user && userData.skills && userData.skills.length === 0) {
            fetchData("skills");
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

    const handleSubmit = async (snippet) => {
        try {
            const result = await API.post("api", "/snippet", {
                headers: {
                    Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                },
                body: {
                    snippet: snippet
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
                                        onDelete={handleDelete} />)
                        ) : (
                        <h2>You have no experience snippets saved. Try adding some snippets!</h2>
                        )}
                    </div>
                </>
            )}

            <IconButton iconType="back"
                        caption="Dashboard" />
        </div>
  )};
  
  export default ExperiencePage;