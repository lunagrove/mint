import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import { FaSpinner } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import IconButton from "../components/IconButton";
import Hobby from "../components/Hobby";
import AddHobby from '../components/AddHobby';
import { LuRefreshCw } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useData } from '../utilities/DataContext';
import { fetchHobbies } from "../utilities/fetchData";

function HobbiesPage() {

    const {user} = useAuthenticator((context) => [context.user]);
    const { userData, updateUserData } = useData();

    const [loadingHobbies, setLoadingHobbies] = useState(false);
    const [isSpinningHobbies, setIsSpinningHobbies] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [hobbiesCount, setHobbiesCount] = useState(0);

    useEffect(() => {
        if (user && userData.hobbies && userData.hobbies.length === 0) {
            setLoadingHobbies(true);
            fetchData("hobbies");
        }  
    }, []);

    useEffect(() => {
        if (userData.hobbies) {
            setHobbiesCount(userData.hobbies.length);
        }
    }, [userData.hobbies]);

    const handleAddHobby = () => {
        setIsPanelOpen(true);
    };

    const handleDelete = async (hobbyId) => {
        try {
            await API.del("api", `/hobby/${hobbyId}`, {
                headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                }
            });
              
            await updateUserData((prevUserData) => {
                return {
                    ...prevUserData,
                    hobbies: prevUserData.hobbies.filter(hobby => hobby.hobbyid !== hobbyId),
                };
            });  
        }
        catch (error) {
              alert(error);
        }
    };

    const handleSubmit = async (description, snippet) => {
        try {
            const result = await API.post("api", "/hobby", {
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
                const newHobby = result.hobby;
                await updateUserData((prevUserData) => {
                    return {
                        ...prevUserData,
                        hobbies: [newHobby, ...prevUserData.hobbies]
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
            hobbies: newData,
            };
        });
    };

    useEffect(() => {
        if (isSpinningHobbies) {
            fetchData("hobbies");
        }
    }, [isSpinningHobbies]);

    const fetchData = async (dataType) => {
        if (dataType === "hobbies") {
            const hobbies = await fetchHobbies();
            if (hobbies) {
                setIsSpinningHobbies(false);
                setLoadingHobbies(false);
                handleUpdateData(hobbies);
            }
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
                <h2>Manage Hobbies and Clubs ({hobbiesCount})</h2>
                <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningHobbies ? 'spin' : ''}`}
                             onClick={handleRefreshHobbies} />
            </div>

            {<div className={`page-panel2 ${isPanelOpen ? 'open' : 'hide'}`}>
                <div className="page-add">
                    <h2>Add Hobby or Club</h2>
                    {!isPanelOpen && (
                        <img
                        className="plus-button plus-button-medium"
                        src="./plus-icon-80x80.png"
                        alt="Plus icon"
                        onClick={handleAddHobby}
                        />
                    )}
                </div>
                {isPanelOpen && (
                    <AddHobby onSubmit={handleSubmit}
                              onClose={handleClose} />
                )}
            </div>}
        
            {loadingHobbies ? (
                <div className="page-list page-list-loading">
                    <FaSpinner className="spin icon-large" />
                </div>
            ) : (
                <>
                    <div className="page-list">
                        {userData.hobbies && userData.hobbies.length > 0 ? (userData.hobbies.map((item) =>
                            <Hobby key={item.hobbyid}
                                   hobby={item}
                                   onDelete={handleDelete} />)
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