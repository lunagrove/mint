import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { Navigate } from "react-router-dom";
import { Auth, API } from "aws-amplify";

import "@aws-amplify/ui-react/styles.css";

export default function Login() {
  const { route } = useAuthenticator((context) => [context.route]);

  if (route == "idle") {
    return <></>;
  }

  if (route == "authenticated") {
    return <Navigate to="/" />;
  }

  const handleSignUp = async () => {
    try {
      const {user} = useAuthenticator((context) => [context.user]);
      await addUserRecord(user.attributes.sub, user.attributes.email);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const addUserRecord = async (userId, email) => {
    try {
      const session = await Auth.currentSession();
      const token = session.getAccessToken().getJwtToken();
      const response = await API.post("api", "/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        body: {
          userId: userId,
          email: email
        },  
      }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleStateChange = (state) => {
    if (state === 'signUp') {
      console.log('User is signing up');
      handleSignUp();
    }
  };

  return <Authenticator
    signUpAttributes={[]}
    onStateChange={handleStateChange} />;
}