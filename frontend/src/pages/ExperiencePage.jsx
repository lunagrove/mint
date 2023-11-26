import { useAuthenticator } from "@aws-amplify/ui-react";

function ExperiencePage() {

    const {user} = useAuthenticator((context) => [context.user]);
  
    return (
        <div className="page-content">
            <div className="page-heading">
                <img className="mint-leaf-medium" src="./Mint-leaf-transparent.png" alt="<Mint leaf>"/>
                <h2>Manage Experience</h2>
            </div>
        </div>
  )};
  
  export default ExperiencePage;