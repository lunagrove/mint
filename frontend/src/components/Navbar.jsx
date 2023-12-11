import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { FaEllipsis } from "react-icons/fa6";
import { Auth } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { menuItems } from "../utilities/constants";

function Navbar() {

    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const {user} = useAuthenticator((context) => [context.user]);
    
    const handleSignOut = async () => {
        try {
          await Auth.signOut();
          setDropdownVisible(false);
          navigate('/login', { replace: true });
        } catch (error) {
          alert(error);
        }
    };

    const handleMenuClick = () => {
        setDropdownVisible(false);
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
                    <Link to="/">
                        <img className="logo-main" src="./logo-main.png" alt="Mint logo" />
                    </Link>
                </div>
                <div className="nav-right">
                    {user && (
                        <div className="nav-right-menu">
                            <div className="ellipsis-container">
                                <FaEllipsis className="icon-large"/>
                                <div className={`dropdown-content ${dropdownVisible ? 'visible' : ''}`}>
                                    {menuItems.map(({ label, route }, index) => (
                                        <Link key={index}
                                              to={route}
                                              onClick={handleMenuClick}>{label}</Link>
                                    ))} 
                                </div>
                            </div>
                            <Link to="#" className="nav-logout" onClick={handleSignOut}>Logout</Link>
                        </div>
                    )}
                </div>              
            </div>
        </nav>
    );
}

export default Navbar;
