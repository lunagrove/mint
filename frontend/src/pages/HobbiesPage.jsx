import { useAuthenticator } from "@aws-amplify/ui-react";
import { GrGroup } from "react-icons/gr";

function HobbiesPage() {

    const {user} = useAuthenticator((context) => [context.user]);
  
    return (
        <div className="page-content">
            <div className="page-heading">
                <GrGroup className="icon-xlarge icon-margin-right" />
                <h2>Manage Hobbies and Clubs</h2>
            </div>
        </div>
  )};
  
  export default HobbiesPage;