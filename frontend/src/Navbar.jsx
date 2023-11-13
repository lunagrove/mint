import { Link } from "react-router-dom";
//import { useAuthenticator } from "@aws-amplify/ui-react";
import { FaUserCircle } from 'react-icons/fa';
import { Auth } from "aws-amplify";

function Navbar({user}) {
    
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
                    {user && (
                        <>
                            <FaUserCircle className="icon-large nav-user" />
                            <p className="welcome-msg">Welcome {user.attributes ? user.attributes.email : user.username}</p>
                        </>
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
