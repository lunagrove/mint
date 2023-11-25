import { useAuthenticator } from "@aws-amplify/ui-react";
import Login from "../components/Login";
import { Link } from "react-router-dom";

function LoginPage() {

  const {user} = useAuthenticator((context) => [context.user]);

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <Link to="/"></Link>
      )}
    </>      
  );
}
  
  export default LoginPage;