import { useAuthenticator } from "@aws-amplify/ui-react";
import { GrGroup } from "react-icons/gr";
import IconButton from "../components/IconButton";

function HobbiesPage() {

    const {user} = useAuthenticator((context) => [context.user]);
  
    return (
        <div className="page-content">
            <div className="page-heading">
                <GrGroup className="icon-xlarge icon-margin-right" />
                <h2>Manage Hobbies and Clubs</h2>
            </div>
            <IconButton iconType="back"
                        caption="Dashboard" />
        </div>
  )};
  
  export default HobbiesPage;