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
import { fetchProjects } from "../utilities/fetchData";

function ProjectsPage() {

    const {user} = useAuthenticator((context) => [context.user]);
    const { userData, updateUserData } = useData();

    const [loadingProjects, setLoadingProjects] = useState(false);
    const [isSpinningProjects, setIsSpinningProjects] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [projectsCount, setProjectsCount] = useState(0);

    useEffect(() => {
        if (user && userData.projects && userData.projects.length === 0) {
            setLoadingProjects(true);
            fetchData("projects");
        }  
    }, []);

    useEffect(() => {
        if (userData.projects) {
            setProjectsCount(userData.projects.length);
        }
    }, [userData.projects]);

    const handleAddProject = () => {
        setIsPanelOpen(true);
    };

    const handleDelete = async (projectId) => {
        try {
            await API.del("api", `/project/${projectId}`, {
                headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                }
            });
              
            await updateUserData((prevUserData) => {
                return {
                    ...prevUserData,
                    projects: prevUserData.projects.filter(project => project.projectid !== projectId),
                };
            });  
        }
        catch (error) {
              alert(error);
        }
    };

    const handleEdit = async (projectId, description, snippet) => {
        try {
            await API.put("api", `/project/${projectId}`, {
                headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                },
                body: { description: description,
                        snippet: snippet }
            });
            await updateUserData((prevUserData) => {
                return {
                    ...prevUserData,
                    projects: prevUserData.projects.map((project) =>
                        project.projectid === projectId ? { ...project, description: description, snippet: snippet } : project
                    ),
                };
            });
        }
        catch (error) {
              alert(error);
        }
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
                const newProject = result.project;
                await updateUserData((prevUserData) => {
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
            fetchData("projects");
        }
    }, [isSpinningProjects]);

    const fetchData = async (dataType) => {
        if (dataType === "projects") {
            const projects = await fetchProjects();
            if (projects) {
                setIsSpinningProjects(false);
                setLoadingProjects(false);
                handleUpdateData(projects);
            }
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
                <h2>Manage Side Projects ({projectsCount})</h2>
                <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningProjects ? 'spin' : ''}`}
                             onClick={handleRefreshProjects} />
            </div>

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

            {loadingProjects ? (
                <div className="page-list page-list-loading">
                    <FaSpinner className="spin icon-large" />
                </div>
            ) : (
                <>
                    <div className="page-list">
                        {userData.projects && userData.projects.length > 0 ? (userData.projects.map((item) =>
                            <Project key={item.projectid}
                                     project={item}
                                     onDelete={handleDelete}
                                     onEdit={handleEdit} />)
                        ) : (
                        <h2>You have no projects saved. Try adding some projects!</h2>
                        )}
                    </div>
                    
                </>
            )}
            
            <IconButton iconType="back"
                        caption="Dashboard" />
        </div>
  )};
  
  export default ProjectsPage;