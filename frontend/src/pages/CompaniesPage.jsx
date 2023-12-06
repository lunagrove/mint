import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import { BsBriefcase } from "react-icons/bs";
import { LuRefreshCw } from "react-icons/lu";
import { FaSpinner } from "react-icons/fa";
import { useState, useEffect } from "react";
import Companies from "../components/Companies";
import IconButton from "../components/IconButton";
import Company from '../components/Company';
import { useData } from '../utilities/DataContext';

function CompaniesPage() {

    const {user} = useAuthenticator((context) => [context.user]);
    const { userData, updateUserData } = useData();

    const [loadingCompanies, setLoadingCompanies] = useState(false);
    const [isSpinningCompanies, setIsSpinningCompanies] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const handleAddCompany = () => {
        setIsPanelOpen(true);
      };
    
      const handleSubmit = async (companyName, description) => {
        try {
            const result = await API.post("api", "/company", {
                headers: {
                    Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                },
                body: {
                    companyName: companyName,
                    description: description
                }
            });
            if (result) {
                const newCompany = result;
                updateUserData((prevUserData) => {
                    return {
                        ...prevUserData,
                        companies: [newCompany, ...prevUserData.companies]
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
            companies: newData,
            };
        });
    };

    useEffect(() => {
        if (isSpinningCompanies) {
            fetchCompanies();
        }
    }, [isSpinningCompanies]);

    const fetchCompanies = async () => {
        let response;
        try {
            const session = await Auth.currentSession();
            const token = session.getAccessToken().getJwtToken();
            response = await API.get("api", "/companies", {
                headers: {
                Authorization: `Bearer ${token}`  
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsSpinningCompanies(false);
            setLoadingCompanies(false);
            handleUpdateData(response.companies);
        }
    };

    const handleRefreshCompanies = () => {
        setLoadingCompanies(true);
        setIsSpinningCompanies(true);
    };
  
    return (
        <div className="page-content">
            <div className="page-heading">
                <BsBriefcase className="icon-xlarge icon-margin-right" />
                <h2>Manage Companies and Roles</h2>
                <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningCompanies ? 'spin' : ''}`}
                             onClick={handleRefreshCompanies} />
            </div>

            {loadingCompanies ? (
                <div className="page-list page-list-loading">
                    <FaSpinner className="spin icon-large" />
                </div>
            ) : (
                <>
                    <div className="page-list">
                        {userData.companies && userData.companies.length > 0 ? (userData.companies.map((item) =>
                            <Companies key={item.companyId}
                                       company={item} />)
                        ) : (
                        <h2>You have no companies and roles saved. Try adding some companies and roles!</h2>
                        )}
                    </div>
                </>
            )}
            <div className={`page-panel ${isPanelOpen ? 'open' : 'hide'}`}>
                <div className="page-add">
                    <h2>Add Company</h2>
                    {!isPanelOpen && (
                        <img
                        className="plus-button plus-button-medium"
                        src="./plus-icon-80x80.png"
                        alt="Plus icon"
                        onClick={handleAddCompany}
                        />
                    )}
                </div>
                {isPanelOpen && (
                    <Company onSubmit={handleSubmit}
                             onClose={handleClose} />
                )}
            </div>
            <IconButton iconType="back"
                        caption="Dashboard" />
        </div>
  )};
  
  export default CompaniesPage;