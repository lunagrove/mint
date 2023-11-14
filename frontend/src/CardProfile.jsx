import React from 'react';
import { useState } from "react";
import { BsPencil } from "react-icons/bs";
import EditModal from './EditModal';
import { cardTypes } from "./utilities/constants";

const CardProfile = ({ profile }) => {

    const firstName = profile.firstname ? profile.firstname : '';
    const lastName = profile.lastname ? profile.lastname : ''; 
    const fullName = `${firstName} ${lastName}`;

    const [isModalOpen, setModalOpen] = useState(false);
    const cardNumber = cardTypes.indexOf('Profile');

    const handleEditClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>    
            <div className="profile-container">
                <div className="profile-details">
                    <div className="profile-first">
                        <div className="profile-info">
                            <h6>Name</h6>
                            <p>{profile.firstname || profile.lastname ? fullName : '---'}</p>
                        </div>
                        <BsPencil className="icon-medium edit-icon" onClick={handleEditClick}/>
                    </div>
                    <div className="profile-info">
                        <h6>Email</h6>
                        <p>{profile.emailaddress ? profile.emailaddress : '---'}</p>
                    </div>
                    <div className="profile-info">
                        <h6>Phone</h6>
                        <p>{profile.phonenumber ? profile.phonenumber : '---'}</p>
                    </div>
                    <div className="profile-info">
                        <h6>Location</h6>
                        <p>{profile.location ? profile.location : '---'}</p>
                    </div>
                </div>
                <div className="profile-links">
                    <div className="profile-info">
                        <h6>LinkedIn</h6>
                        <p>{profile.linkedin ? profile.linkedin : '---'}</p>
                    </div>
                    <div className="profile-info">
                        <h6>Website</h6>
                        <p>{profile.website ? profile.website : '---'}</p>
                    </div>
                </div>
            </div> 
            {isModalOpen && (
                <EditModal onClose={handleCloseModal}
                           cardNumber={cardNumber}
                           profile={profile} />
            )}
        </>        
    );
}

export default CardProfile;
