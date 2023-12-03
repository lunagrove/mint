import React from 'react';
import { useState } from "react";
import { BsPencil } from "react-icons/bs";
import EditModal from './EditModal';
import { cardTypes, cardConfig } from "../utilities/constants";
import { Auth, API } from "aws-amplify";
import { useData } from '../utilities/DataContext';

const CardProfile = () => {

    const { userData, updateUserData } = useData();

    const firstName = userData.profile.firstname ? userData.profile.firstname : '';
    const lastName = userData.profile.lastname ? userData.profile.lastname : ''; 
    const fullName = `${firstName} ${lastName}`;

    const [isModalOpen, setModalOpen] = useState(false);
    const [isIntroOpen, setIntroOpen] = useState(false);
    const cardNumber = cardTypes.indexOf('Profile');
    let updatedData;

    const handleEditClick = () => {
        setModalOpen(true);
    };

    const handleAddClick = () => {
        setIntroOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setIntroOpen(false);
        updateUserData((prevUserData) => {
            return {
                ...prevUserData,
                profile: {
                ...prevUserData.profile,
                ...updatedData,
                },
            };
        });
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
            updatedData = result;
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
                            <p>{userData.profile.firstname || userData.profile.lastname ? fullName : '---'}</p>
                        </div>
                        <BsPencil className="icon-medium edit-icon" onClick={handleEditClick}/>
                    </div>
                    <div className="profile-info">
                        <h6>Email</h6>
                        <p>{userData.profile.emailaddress ? userData.profile.emailaddress : '---'}</p>
                    </div>
                    <div className="profile-info">
                        <h6>Phone</h6>
                        <p>{userData.profile.phonenumber ? userData.profile.phonenumber : '---'}</p>
                    </div>
                    <div className="profile-info">
                        <h6>Location</h6>
                        <p>{userData.profile.location ? userData.profile.location : '---'}</p>
                    </div>
                    <div className="profile-info">
                        <h6>LinkedIn</h6>
                        <p>{userData.profile.linkedin ? userData.profile.linkedin : '---'}</p>
                    </div>
                    <div className="profile-info">
                        <h6>Website</h6>
                        <p>{userData.profile.website ? userData.profile.website : '---'}</p>
                    </div>
                </div>
                <div className="profile-intro">
                    <img
                        className="plus-button"
                        src="./plus-icon-80x80.png"
                        alt="Plus icon"
                        onClick={handleAddClick}
                    />
                    <h5>{cardConfig[cardNumber]?.heading}</h5>
                </div>
            </div> 
            {isModalOpen && (
                <EditModal onClose={handleCloseModal}
                           onSubmit={handleSubmit}
                           cardNumber={cardNumber}
                           intro={false} />
            )}
            {isIntroOpen && (
                <EditModal onClose={handleCloseModal}
                           onSubmit={handleSubmit}
                           cardNumber={cardNumber}
                           intro={true} />
            )}
        </>        
    );
}

export default CardProfile;
