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
    const { userData, updateUserData } = useData();

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
                                       education={item} />)
                        ) : (
                        <h2>You have no educational institutions saved. Try adding some educational institutions!</h2>
                        )}
                    </div>
                    
                </>
            )}
            
            <IconButton iconType="back"
                        caption="Dashboard" />
        </div>
  )};
  
  export default EducationPage;