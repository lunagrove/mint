import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import { FaSpinner } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { IoSchoolOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import Education from "../components/Education";
import IconButton from "../components/IconButton";
import Institution from '../components/Institution';
import { useData } from '../utilities/DataContext';

function EducationPage() {

    const {user} = useAuthenticator((context) => [context.user]);
    const { userData, updateUserData } = useData();

    const [loadingEducation, setLoadingEducation] = useState(true);
    const [isSpinningEducation, setIsSpinningEducation] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

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
                updateUserData((prevUserData) => {
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
        if (user) {
          fetchEducation();
        }
    }, [user]);

    useEffect(() => {
        if (isSpinningEducation) {
            fetchEducation();
        }
    }, [isSpinningEducation]);

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
          handleUpdateData(response.education);
        }
    };

    const handleRefreshEducation = () => {
        setLoadingEducation(true);
        setIsSpinningEducation(true);
    };
    
    return (
        <div className="page-content">
            <div className="page-heading">
                <IoSchoolOutline className="icon-xlarge icon-margin-right" />
                <h2>Manage Education</h2>
                <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningEducation ? 'spin' : ''}`}
                             onClick={handleRefreshEducation} />
            </div>

            {loadingEducation ? (
                <div className="page-list page-list-loading">
                    <FaSpinner className="spin icon-large" />
                </div>
            ) : (
                <>
                    <div className="page-list">
                        {userData.education && userData.education.length > 0 ? (userData.education.map((item) =>
                            <Education key={item.educationId}
                                       education={item} />)
                        ) : (
                        <h2>You have no educational institutions saved. Try adding some educational institutions!</h2>
                        )}
                    </div>
                    
                </>
            )}
            
            <div className={`page-panel ${isPanelOpen ? 'open' : 'hide'}`}>
                <div className="page-add">
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
                    <Institution onSubmit={handleSubmit}
                                onClose={handleClose} />
                )}
            </div>
            
            <IconButton iconType="back"
                        caption="Dashboard" />
        </div>
  )};
  
  export default EducationPage;