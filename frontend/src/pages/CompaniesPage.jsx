import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import { BsBriefcase } from "react-icons/bs";
import { LuRefreshCw } from "react-icons/lu";
import { FaSpinner } from "react-icons/fa";
import { useState, useEffect } from "react";
import Companies from "../components/Companies";
import IconButton from "../components/IconButton";
import AddCompany from '../components/AddCompany';
import { useData } from '../utilities/DataContext';
import { fetchCompanies } from "../utilities/fetchData";

function CompaniesPage() {

    const {user} = useAuthenticator((context) => [context.user]);
    const { userData, updateUserData } = useData();

    const [loadingCompanies, setLoadingCompanies] = useState(false);
    const [isSpinningCompanies, setIsSpinningCompanies] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [companiesCount, setCompaniesCount] = useState(0);

    useEffect(() => {
        if (user && userData.companies && userData.companies.length === 0) {
            setLoadingCompanies(true);
            fetchData("companies");
        }  
    }, []);

    useEffect(() => {
        if (userData.companies) {
            setCompaniesCount(userData.companies.length);
        }
    }, [userData.companies]);

    const handleAddCompany = () => {
        setIsPanelOpen(true);
      };

    const handleEdit = async (companyId, description, name) => {
        try {
            await API.put("api", `/company/${companyId}`, {
                headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                },
                body: { companyName: name,
                        description: description }
            });
            await updateUserData((prevUserData) => {
                return {
                    ...prevUserData,
                    companies: prevUserData.companies.map((company) =>
                        company.companyId === companyId ? { ...company, companyName: name, description: description } : company
                    ),
                };
            });
        }
        catch (error) {
              alert(error);
        }
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
                await updateUserData((prevUserData) => {
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

    const handleDelete = async (companyId) => {
        try {
            await API.del("api", `/company/${companyId}`, {
                headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                }
            });
              
            await updateUserData((prevUserData) => {
                return {
                    ...prevUserData,
                    companies: prevUserData.companies.filter(company => company.companyid !== companyId),
                };
            });  
        }
        catch (error) {
              alert(error);
        }
    };

    const handleDeleteRole = async (companyId, roleId) => {
        try {
            await API.del("api", `/role/${companyId}/${roleId}`, {
                headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                }
            });
            await updateUserData((prevUserData) => {
                const companyIndex = prevUserData.companies.findIndex((company) => company.companyId === companyId);
                if (companyIndex !== -1) {
                    const updatedDetails = prevUserData.companies[companyIndex].details.filter((role) => role.id !== roleId);
                    const updatedCompanies = [
                        ...prevUserData.companies.slice(0, companyIndex),
                        {
                            ...prevUserData.companies[companyIndex],
                            details: updatedDetails
                        },
                        ...prevUserData.companies.slice(companyIndex + 1)
                    ];
                    const updatedSnippets = prevUserData.snippets.map((snippet) => {
                        if (snippet.companyId === companyId) {
                            const updatedRoles = snippet.roles.filter((role) => role.id !== roleId);
                            return {
                                ...snippet,
                                roles: updatedRoles,
                            };
                        }
                        return snippet;
                    });
                    const updatedUserData = {
                        ...prevUserData,
                        companies: updatedCompanies,
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

    const handleEditRole = async (companyId, roleId, description, fromDate, toDate, current) => {
        try {
            await API.put("api", `/role/${companyId}/${roleId}`, {
                headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                },
                body: {
                    description: description,
                    fromDate: fromDate,
                    toDate: toDate,
                    current: current
                }
            });
            await updateUserData((prevUserData) => {
                const companyIndex = prevUserData.companies.findIndex((company) => company.companyId === companyId);
                if (companyIndex !== -1) {
                    const updatedDetails = prevUserData.companies[companyIndex].details.map((role) => {
                        if (role.id === roleId) {
                            return {
                                ...role,
                                description, fromDate, toDate, current
                            };
                        }
                        return role;
                    });
                    const updatedCompanies = [
                        ...prevUserData.companies.slice(0, companyIndex),
                        {
                            ...prevUserData.companies[companyIndex],
                            details: updatedDetails,
                        },
                        ...prevUserData.companies.slice(companyIndex + 1),
                    ];
                    const updatedUserData = {
                        ...prevUserData,
                        companies: updatedCompanies,
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
            companies: newData,
            };
        });
    };

    useEffect(() => {
        if (isSpinningCompanies) {
            fetchData("companies");
        }
    }, [isSpinningCompanies]);

    const fetchData = async (dataType) => {
        if (dataType === "companies") {
            const companies = await fetchCompanies();
            if (companies) {
              setIsSpinningCompanies(false);
              setLoadingCompanies(false);
              handleUpdateData(companies);
            }
        }
    };

    const handleRefreshCompanies = () => {
        setLoadingCompanies(true);
        setIsSpinningCompanies(true);
    };
  
    return (
        <div className="companies-page-content">
            <div className="companies-page-heading">
                <BsBriefcase className="icon-xlarge icon-margin-right" />
                <h2>Manage Companies and Roles ({companiesCount})</h2>
                <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningCompanies ? 'spin' : ''}`}
                             onClick={handleRefreshCompanies} />
            </div>

            <div className={`companies-page-panel ${isPanelOpen ? 'open' : 'hide'}`}>
                <div className="companies-page-add">
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
                    <AddCompany onSubmit={handleSubmit}
                                onClose={handleClose} />
                )}
            </div>

            {loadingCompanies ? (
                <div className="companies-page-list companies-page-list-loading">
                    <FaSpinner className="spin icon-large" />
                </div>
            ) : (
                <>
                    <div className="companies-page-list">
                        {userData.companies && userData.companies.length > 0 ? (userData.companies.map((item) =>
                            <Companies key={item.companyId}
                                       company={item}
                                       onDelete={handleDelete}
                                       onDeleteRole={handleDeleteRole}
                                       onEdit={handleEdit}
                                       onEditRole={handleEditRole} />)
                        ) : (
                        <h2>You have no companies and roles saved. Try adding some companies and roles!</h2>
                        )}
                    </div>
                </>
            )}
            
            <IconButton iconType="back"
                        caption="Dashboard" />
        </div>
  )};
  
  export default CompaniesPage;