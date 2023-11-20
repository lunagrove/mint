import React from 'react';
import { useState } from "react";
import { BsPencil } from "react-icons/bs";
import EditModal from './EditModal';
import { cardTypes } from "./utilities/constants";
import { Auth, API } from "aws-amplify";

const CardProfile = ({ profile, refreshProfile }) => {

    const firstName = profile.firstname ? profile.firstname : '';
    const lastName = profile.lastname ? profile.lastname : ''; 
    const fullName = `${firstName} ${lastName}`;

    const [isModalOpen, setModalOpen] = useState(false);
    const [isIntroOpen, setIntroOpen] = useState(false);
    const cardNumber = cardTypes.indexOf('Profile');

    const handleEditClick = () => {
        setModalOpen(true);
    };

    const handleAddClick = () => {
        setIntroOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setIntroOpen(false);
        refreshProfile();
    };

    const handleSubmit = async (newProfile) => {
        try {
            const result = await API.put("api", "/profile", {
                headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                }, 
                body: {newProfile}
            })
            const profile = result;
            handleCloseModal();
        }
        catch (error) {
          alert(error);
        }    
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
                    <div className="profile-info">
                        <h6>LinkedIn</h6>
                        <p>{profile.linkedin ? profile.linkedin : '---'}</p>
                    </div>
                    <div className="profile-info">
                        <h6>Website</h6>
                        <p>{profile.website ? profile.website : '---'}</p>
                    </div>
                </div>
                <div className="profile-intro">
                    <img
                        className="plus-button"
                        src="./plus-icon-80x80.png"
                        alt="Plus icon"
                        onClick={handleAddClick}
                    />
                    <h5>Add introduction statements</h5>
                </div>
            </div> 
            {isModalOpen && (
                <EditModal onClose={handleCloseModal}
                           onSubmit={handleSubmit}
                           cardNumber={cardNumber}
                           inputProfile={profile}
                           intro={false} />
            )}
            {isIntroOpen && (
                <EditModal onClose={handleCloseModal}
                           onSubmit={handleSubmit}
                           cardNumber={cardNumber}
                           inputProfile={profile}
                           intro={true} />
            )}
        </>        
    );
}

export default CardProfile;
