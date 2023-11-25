import { useAuthenticator } from "@aws-amplify/ui-react";

function ExperiencePage() {

    const {user} = useAuthenticator((context) => [context.user]);
  
    return (
        <div className="page-content">
            <h2>Manage Experience</h2>
            
        </div>
  )};
  
  export default ExperiencePage;