import { useAuthenticator } from "@aws-amplify/ui-react";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import IconButton from "../components/IconButton";

function ProjectsPage() {

    const {user} = useAuthenticator((context) => [context.user]);
  
    return (
        <div className="page-content">
            <div className="page-heading">
                <HiOutlineClipboardDocumentList className="icon-xlarge icon-margin-right" />
                <h2>Manage Side Projects</h2>
            </div>
            <IconButton iconType="back"
                        caption="Dashboard" />
        </div>
  )};
  
  export default ProjectsPage;