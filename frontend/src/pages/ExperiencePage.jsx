import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import { FaSpinner } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { useState, useEffect } from "react";
import IconButton from "../components/IconButton";
import Experience from "../components/Experience";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Tips from '../components/Tips';
import { useData } from '../utilities/DataContext';

function ExperiencePage() {

    const {user} = useAuthenticator((context) => [context.user]);
    const { userData, updateUserData } = useData();

    const [loadingSnippets, setLoadingSnippets] = useState(false);
    const [isSpinningSnippets, setIsSpinningSnippets] = useState(false);

    const [isTipsOpen, setIsTipsOpen] = useState(false);
    const [selectedTipIndex, setSelectedTipIndex] = useState(0);

    const openTips = (index) => {
        setSelectedTipIndex(index);
        setIsTipsOpen(true);
    };
    
    const closeTips = () => {
        setIsTipsOpen(false);
    };

    const handleUpdateData = (newData) => {
        updateUserData((prevUserData) => {
            return {
            ...prevUserData,
            snippets: newData,
            };
        });
    };

    useEffect(() => {
        if (isSpinningSnippets) {
            fetchSnippets();
        }
    }, [isSpinningSnippets]);

    const fetchSnippets = async () => {
        let response;
        try {
          const session = await Auth.currentSession();
          const token = session.getAccessToken().getJwtToken();
          response = await API.get("api", "/snippets", {
            headers: {
              Authorization: `Bearer ${token}`  
            }
          });
        } catch (error) {
          console.log(error);
        } finally {
          setIsSpinningSnippets(false);
          setLoadingSnippets(false);
          handleUpdateData(response.snippets);
        }
    };

    const handleRefreshSnippets = () => {
        setLoadingSnippets(true);
        setIsSpinningSnippets(true);
    };
  
    return (
        <div className="page-content">
            <div className="page-heading">
                <img className="mint-leaf-medium" src="./Mint-leaf-transparent.png" alt="<Mint leaf>"/>
                <h2>Manage Experience</h2>
                <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningSnippets ? 'spin' : ''}`}
                             onClick={handleRefreshSnippets} />
            </div>
            {loadingSnippets ? (
                <div className="page-list page-list-loading">
                    <FaSpinner className="spin icon-large" />
                </div>
            ) : (
                <>
                    <div className="page-list">
                        {userData.snippets && userData.snippets.length > 0 ? (userData.snippets.map((item) =>
                            <Experience key={item.experienceid}
                                        snippet={item} />)
                        ) : (
                        <h2>You have no experience snippets saved. Try adding some snippets!</h2>
                        )}
                    </div>
                </>
            )}
            <div>
                <IoMdInformationCircleOutline className="icon-large tips-icon" onClick={() => openTips(0)} />
                <IoMdInformationCircleOutline className="icon-large tips-icon" onClick={() => openTips(1)} />
                {isTipsOpen && <Tips tipIndex={selectedTipIndex}
                                     onClose={closeTips} />}
            </div>
            <IconButton iconType="back"
                        caption="Dashboard" />
        </div>
  )};
  
  export default ExperiencePage;