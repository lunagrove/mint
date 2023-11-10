import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

function Navbar() {

    const {user} = useAuthenticator((context) => [context.user]);
    /* if (user) {
        console.log('user', user);
    } */

    const handleSignOut = async () => {
        try {
          await Auth.signOut();
          window.location.href = '/';
        } catch (error) {
          alert(error);
        }
    };

    return (
        <nav>
            <div className="nav-container">
                <div className="nav-left">
                    <img className="nav-user" src="./logged-in-user.png" alt="User icon"></img>
                    {user && (
                        <p className="welcome-msg">Welcome {user.attributes.email}</p>
                    )}
                </div>
                <div className="nav-center">
                    <img className="logo-main" src="./logo-main.png" alt="Mint logo"></img>
                </div>
                <div className="nav-right">
                    {user && (
                        <Link to="#" className="nav-logout" onClick={handleSignOut}>Logout</Link>
                    )}
                </div>              
            </div>
        </nav>
    );
}

export default Navbar;
