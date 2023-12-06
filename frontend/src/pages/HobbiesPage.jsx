import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import { FaSpinner } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import IconButton from "../components/IconButton";
import Hobby from "../components/Hobby";
import { LuRefreshCw } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useData } from '../utilities/DataContext';

function HobbiesPage() {

    const {user} = useAuthenticator((context) => [context.user]);
    const { userData, updateUserData } = useData();

    const [loadingHobbies, setLoadingHobbies] = useState(false);
    const [isSpinningHobbies, setIsSpinningHobbies] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const handleAddHobby = () => {
        setIsPanelOpen(true);
    };

    const handleSubmit = async (institution, location) => {

    };

    const handleClose = () => {
        setIsPanelOpen(false);
    };

    const handleUpdateData = (newData) => {
        updateUserData((prevUserData) => {
            return {
            ...prevUserData,
            hobbies: newData,
            };
        });
    };

    useEffect(() => {
        if (isSpinningHobbies) {
            fetchHobbies();
        }
    }, [isSpinningHobbies]);

    const fetchHobbies = async () => {
        let response;
        try {
        const session = await Auth.currentSession();
        const token = session.getAccessToken().getJwtToken();
        response = await API.get("api", "/hobbies", {
            headers: {
            Authorization: `Bearer ${token}`  
            }
        });
        } catch (error) {
        console.log(error);
        } finally {
        setIsSpinningHobbies(false);
        setLoadingHobbies(false);
        handleUpdateData(response.hobbies);
        }
    };

    const handleRefreshHobbies = () => {
        setLoadingHobbies(true);
        setIsSpinningHobbies(true);
    };
  
    return (
        <div className="page-content">
            <div className="page-heading">
                <GrGroup className="icon-xlarge icon-margin-right" />
                <h2>Manage Hobbies and Clubs</h2>
                <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningHobbies ? 'spin' : ''}`}
                             onClick={handleRefreshHobbies} />
            </div>
            
        
            {loadingHobbies ? (
                <div className="page-list page-list-loading">
                    <FaSpinner className="spin icon-large" />
                </div>
            ) : (
                <>
                    <div className="page-list">
                        {userData.hobbies && userData.hobbies.length > 0 ? (userData.hobbies.map((item) =>
                            <Hobby key={item.hobbyid}
                                   hobby={item} />)
                        ) : (
                        <h2>You have no hobbies or clubs saved. Try adding some hobbies or clubs!</h2>
                        )}
                    </div>
                    
                </>
            )}
            <IconButton iconType="back"
                        caption="Dashboard" />
        </div>
    );
};
  
export default HobbiesPage;