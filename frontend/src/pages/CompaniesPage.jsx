import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import { BsBriefcase } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { IoSchoolOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import Companies from "../components/Companies";

function CompaniesPage() {

    const {user} = useAuthenticator((context) => [context.user]);

    const [companies, setCompanies] = useState([]);
    const [loadingCompanies, setLoadingCompanies] = useState(true);

    useEffect(() => {
        if (user) {
          fetchCompanies();
        }
      }, [user]);

    const fetchCompanies = async () => {
        try {
            const session = await Auth.currentSession();
            const token = session.getAccessToken().getJwtToken();
            const response = await API.get("api", "/companies", {
                headers: {
                Authorization: `Bearer ${token}`  
                }
            });
            setCompanies(response.companies);
            setLoadingCompanies(false);
        } catch (error) {
            console.log(error);
        }
    };
  
    return (
        <div className="page-content">
            <div className="page-heading">
                <BsBriefcase className="icon-xlarge icon-margin-right" />
                <h2>Manage Companies and Roles</h2>
            </div>

            {loadingCompanies ? (
                <div className="page-list page-list-loading">
                    <FaSpinner className="spin icon-large" />
                </div>
            ) : (
                <div className="page-list">
                    {companies && companies.length > 0 ? (companies.map((item) =>
                        <Companies key={item.companyId}
                                   company={item} />)
                    ) : (
                    <h2>You have no companies and roles saved. Try adding some companies and roles!</h2>
                    )}
                </div>
            )}
        </div>
  )};
  
  export default CompaniesPage;