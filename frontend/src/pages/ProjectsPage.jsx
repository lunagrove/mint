import { useAuthenticator } from "@aws-amplify/ui-react";

function ProjectsPage() {

    const {user} = useAuthenticator((context) => [context.user]);
  
    return (
        <div className="page-content">
            <h2>Manage Side Projects</h2>
        </div>
  )};
  
  export default ProjectsPage;