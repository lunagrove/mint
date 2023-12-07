import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import { FaSpinner } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import IconButton from "../components/IconButton";
import Project from "../components/Project";
import AddProject from '../components/AddProject';
import { LuRefreshCw } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useData } from '../utilities/DataContext';

function ProjectsPage() {

    const {user} = useAuthenticator((context) => [context.user]);
    const { userData, updateUserData } = useData();

    const [loadingProjects, setLoadingProjects] = useState(false);
    const [isSpinningProjects, setIsSpinningProjects] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const handleAddProject = () => {
        setIsPanelOpen(true);
    };

    const handleSubmit = async (description, snippet) => {
        try {
            const result = await API.post("api", "/project", {
                headers: {
                    Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                },
                body: {
                    description: description,
                    snippet: snippet
            }
            });
            if (result) {
                const newProject = result;
                updateUserData((prevUserData) => {
                    return {
                        ...prevUserData,
                        projects: [newProject, ...prevUserData.projects]
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

    const handleUpdateData = (newData) => {
        updateUserData((prevUserData) => {
            return {
            ...prevUserData,
            projects: newData,
            };
        });
    };

    useEffect(() => {
        if (isSpinningProjects) {
            fetchProjects();
        }
    }, [isSpinningProjects]);

    const fetchProjects = async () => {
        let response;
        try {
        const session = await Auth.currentSession();
        const token = session.getAccessToken().getJwtToken();
        response = await API.get("api", "/projects", {
            headers: {
            Authorization: `Bearer ${token}`  
            }
        });
        } catch (error) {
        console.log(error);
        } finally {
        setIsSpinningProjects(false);
        setLoadingProjects(false);
        handleUpdateData(response.projects);
        }
    };

    const handleRefreshProjects = () => {
        setLoadingProjects(true);
        setIsSpinningProjects(true);
    };
  
    return (
        <div className="page-content">
            <div className="page-heading">
                <HiOutlineClipboardDocumentList className="icon-xlarge icon-margin-right" />
                <h2>Manage Side Projects</h2>
                <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningProjects ? 'spin' : ''}`}
                             onClick={handleRefreshProjects} />
            </div>
            {loadingProjects ? (
                <div className="page-list page-list-loading">
                    <FaSpinner className="spin icon-large" />
                </div>
            ) : (
                <>
                    <div className="page-list">
                        {userData.projects && userData.projects.length > 0 ? (userData.projects.map((item) =>
                            <Project key={item.projectid}
                                     project={item} />)
                        ) : (
                        <h2>You have no projects saved. Try adding some projects!</h2>
                        )}
                    </div>
                    
                </>
            )}
            <div className={`page-panel2 ${isPanelOpen ? 'open' : 'hide'}`}>
                <div className="page-add">
                    <h2>Add Side Project</h2>
                    {!isPanelOpen && (
                        <img
                        className="plus-button plus-button-medium"
                        src="./plus-icon-80x80.png"
                        alt="Plus icon"
                        onClick={handleAddProject}
                        />
                    )}
                </div>
                {isPanelOpen && (
                    <AddProject onSubmit={handleSubmit}
                                onClose={handleClose} />
                )}
            </div>
            <IconButton iconType="back"
                        caption="Dashboard" />
        </div>
  )};
  
  export default ProjectsPage;