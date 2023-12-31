import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import { FaSpinner } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { IoSchoolOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import Education from "../components/Education";
import IconButton from "../components/IconButton";
import AddEducation from '../components/AddEducation';
import { useData } from '../utilities/DataContext';
import { fetchEducation } from "../utilities/fetchData";

function EducationPage() {

    const {user} = useAuthenticator((context) => [context.user]);
    const { userData, updateUserData, sortEducationByMaxToDate, sortDetailsByMaxToDate } = useData();

    const [loadingEducation, setLoadingEducation] = useState(false);
    const [isSpinningEducation, setIsSpinningEducation] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [educationCount, setEducationCount] = useState(0);

    useEffect(() => {
        if (user && userData.education && userData.education.length === 0) {
            setLoadingEducation(true);
            fetchData("education");
        }  
    }, []);

    useEffect(() => {
        if (userData.education) {
            setEducationCount(userData.education.length);
        }
    }, [userData.education]);

    const handleAddInstitution = () => {
        setIsPanelOpen(true);
    };

    const handleEdit = async (educationId, institution, location) => {
        try {
            await API.put("api", `/education/${educationId}`, {
                headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                },
                body: { institution: institution,
                        location: location }
            });
            await updateUserData((prevUserData) => {
                return {
                    ...prevUserData,
                    education: prevUserData.education.map((education) =>
                        education.educationId === educationId ? { ...education, institution: institution, location: location } : education
                    ),
                };
            });
        }
        catch (error) {
              alert(error);
        }
    };
    
    const handleSubmit = async (institution, location) => {
        try {
            const result = await API.post("api", "/education", {
                headers: {
                    Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                },
                body: {
                    institution: institution,
                    location: location
            }
            });
            if (result) {
                const newEducation = result;
                await updateUserData((prevUserData) => {
                    return {
                        ...prevUserData,
                        education: [newEducation, ...prevUserData.education]
                    };
                });      
            }
        }
        catch (error) {
                alert(error);
        }
        setIsPanelOpen(false);
    };

    const handleDelete = async (educationId) => {
        try {
            await API.del("api", `/education/${educationId}`, {
                headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                }
            });
              
            await updateUserData((prevUserData) => {
                return {
                    ...prevUserData,
                    education: prevUserData.education.filter(education => education.educationId !== educationId),
                };
            });  
        }
        catch (error) {
              alert(error);
        }
    };

    const handleDeleteCourse = async (educationId, courseId, type) => {
        try {
            await API.del("api", `/course/${educationId}/${courseId}`, {
                headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                },
                body: {
                    type: type
                }
            });
            await updateUserData((prevUserData) => {
                const educationIndex = prevUserData.education.findIndex((education) => education.educationId === educationId);
                if (educationIndex !== -1) {
                    const updatedDetails = prevUserData.education[educationIndex].details.filter((course) => course.id !== courseId);
                    const updatedEducation = [
                        ...prevUserData.education.slice(0, educationIndex),
                        {
                            ...prevUserData.education[educationIndex],
                            details: updatedDetails
                        },
                        ...prevUserData.education.slice(educationIndex + 1)
                    ];
                    const updatedSnippets = prevUserData.snippets.map((snippet) => {
                        if (snippet.tagid === courseId && snippet.tagtype === type) {
                            return {
                                ...snippet,
                                tagid: '',
                                tagtype: '',
                            };
                        }
                        return snippet;
                    });
                    const updatedUserData = {
                        ...prevUserData,
                        education: sortEducationByMaxToDate(updatedEducation),
                        snippets: updatedSnippets,
                    };
                    return updatedUserData;
                }
                return prevUserData;
            });
        }
        catch (error) {
              alert(error);
        }
    };

    const handleEditCourse = async (educationId, courseId, description, type, fromdate, todate, current) => {
        try {
            await API.put("api", `/course/${educationId}/${courseId}`, {
                headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                },
                body: {
                    description: description,
                    fromdate: fromdate,
                    todate: todate,
                    current: current,
                    type: type
                }
            });
            await updateUserData((prevUserData) => {
                const educationIndex = prevUserData.education.findIndex((education) => education.educationId === educationId);
                if (educationIndex !== -1) {
                    const updatedDetails = prevUserData.education[educationIndex].details.map((course) => {
                        if (course.id === courseId) {
                            return {
                                ...course,
                                description, fromdate, todate, current, type
                            };
                        }
                        return course;
                    });
                    const updatedEducation = [...prevUserData.education];
                    updatedEducation[educationIndex] = {
                        ...prevUserData.education[educationIndex],
                        details: sortDetailsByMaxToDate(updatedDetails)
                    };
                    const updatedUserData = {
                        ...prevUserData,
                        education: sortEducationByMaxToDate(updatedEducation),
                    }; 
                    return updatedUserData;
                }
                return prevUserData;
            }); 
        }
        catch (error) {
              alert(error);
        }
    };

    const handleAddCourse = async (educationId, description, type, fromdate, todate, current) => {
        try {
            const course = await API.post("api", `/course/${educationId}`, {
                headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                },
                body: {
                    description: description,
                    fromdate: fromdate,
                    todate: todate,
                    current: current,
                    type: type
                }
            });
            await updateUserData((prevUserData) => {
                const newCourse = {
                    id: course.course.courseid,
                    description: description,
                    fromdate: fromdate,
                    todate: todate,
                    current: current,
                    type: type
                  };
                const educationIndex = prevUserData.education.findIndex((education) => education.educationId === educationId);
                if (educationIndex !== -1) {
                    const updatedEducation = [...prevUserData.education];
                    const updatedDetails = [...updatedEducation[educationIndex].details];
                    updatedDetails.push(newCourse);

                    updatedEducation[educationIndex] = {
                        ...updatedEducation[educationIndex],
                        details: sortDetailsByMaxToDate(updatedDetails)
                    };

                    const updatedUserData = {
                        ...prevUserData,
                        education: sortEducationByMaxToDate(updatedEducation),
                    };                   
                    return updatedUserData;
                }
                return prevUserData;
            }); 
        }
        catch (error) {
              alert(error);
        }
    };

    const handleClose = () => {
        setIsPanelOpen(false);
    };

    const handleUpdateData = (newData) => {
        updateUserData((prevUserData) => {
            return {
            ...prevUserData,
            education: newData,
            };
        });
    };

    useEffect(() => {
        if (isSpinningEducation) {
            fetchData("education");
        }
    }, [isSpinningEducation]);

    const fetchData = async (dataType) => {
        if (dataType === "education") {
            const education = await fetchEducation();
            if (education) {
                setIsSpinningEducation(false);
                setLoadingEducation(false);
                handleUpdateData(education);
            }
        }
    };

    const handleRefreshEducation = () => {
        setLoadingEducation(true);
        setIsSpinningEducation(true);
    };
    
    return (
        <div className="education-page-content">
            <div className="education-page-heading">
                <IoSchoolOutline className="icon-xlarge icon-margin-right" />
                <h2>Manage Education ({educationCount})</h2>
                <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningEducation ? 'spin' : ''}`}
                             onClick={handleRefreshEducation} />
            </div>

            <div className={`education-page-panel ${isPanelOpen ? 'open' : 'hide'}`}>
                <div className="education-page-add">
                    <h2>Add Institution</h2>
                    {!isPanelOpen && (
                        <img
                        className="plus-button plus-button-medium"
                        src="./plus-icon-80x80.png"
                        alt="Plus icon"
                        onClick={handleAddInstitution}
                        />
                    )}
                </div>
                {isPanelOpen && (
                    <AddEducation onSubmit={handleSubmit}
                                  onClose={handleClose} />
                )}
            </div>

            {loadingEducation ? (
                <div className="education-page-list education-page-list-loading">
                    <FaSpinner className="spin icon-large" />
                </div>
            ) : (
                <>
                    <div className="education-page-list">
                        {userData.education && userData.education.length > 0 ? (userData.education.map((item) =>
                            <Education key={item.educationId}
                                       education={item}
                                       onDelete={handleDelete}
                                       onDeleteCourse={handleDeleteCourse}
                                       onEdit={handleEdit}
                                       onEditCourse={handleEditCourse}
                                       onAddCourse={handleAddCourse} />)
                        ) : (
                        <h2>You have no educational institutions saved. Try adding some educational institutions!</h2>
                        )}
                    </div>
                    
                </>
            )}
            
            <IconButton iconType="back"
                        caption="Dashboard"
                        type="link"
                        linkTo="/"
                        size="normal"
                        onClick={null} />
        </div>
  )};
  
  export default EducationPage;