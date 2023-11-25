import { useAuthenticator } from "@aws-amplify/ui-react";

function HobbiesPage() {

    const {user} = useAuthenticator((context) => [context.user]);
  
    return (
        <div className="page-content">
            <h2>Manage Hobbies and Clubs</h2>
        </div>
  )};
  
  export default HobbiesPage;