import { useAuthenticator } from "@aws-amplify/ui-react";

function CompaniesPage() {

    const {user} = useAuthenticator((context) => [context.user]);
  
    return (
        <div className="page-content">
            <h2>Manage Companies and Roles</h2>
        </div>
  )};
  
  export default CompaniesPage;