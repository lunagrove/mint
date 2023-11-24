import { useAuthenticator } from "@aws-amplify/ui-react";

function CompaniesPage() {

    const {user} = useAuthenticator((context) => [context.user]);
  
    return (
        <div>
            <h4>Companies page</h4>
            <p>Username: {user?.username}</p>
            <p>Email: {user?.attributes.email}</p>
        </div>
  )};
  
  export default CompaniesPage;