import { useAuthenticator } from "@aws-amplify/ui-react";

function ExperiencePage() {

    const {user} = useAuthenticator((context) => [context.user]);
  
    return (
        <div>
            <h4>Experience page</h4>
            <p>Username: {user?.username}</p>
            <p>Email: {user?.attributes.email}</p>
        </div>
  )};
  
  export default ExperiencePage;