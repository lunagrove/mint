import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { cardTypes, MAX_SKILLS, cardConfig } from "../utilities/constants";
import EditModal from './EditModal';
import { useData } from '../utilities/DataContext';

const CardSkills = () => {

    const { userData, updateUserData } = useData();

    const [isModalOpen, setModalOpen] = useState(false);
    const [skillCount, setSkillCount] = useState(0);
    const cardNumber = cardTypes.indexOf('Skills');

    const handleEditClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleAddClick = () => {
        setModalOpen(true);
    };

    useEffect(() => {
        if (userData.skills) {
            setSkillCount(userData.skills.length);
        }
      }, [userData.skills]);

    return (
        <>
            {userData.skills && userData.skills.length > 0 ? (
                <div className="skills-container">
                    <div className="skills-list">
                        <div className="skills-left">

                            <div className="skills-inner">
                                {userData.skills.slice(0, MAX_SKILLS).map((skill, index) => (
                                    <div key={index} className="skill-rectangle">
                                        {skill.description}
                                    </div>
                                ))}
                            </div>
                            {skillCount > MAX_SKILLS ? (
                                <div className="skills-extra">and {skillCount - MAX_SKILLS} more...</div>
                            ) : null}
                            
                        </div>

                        <div className="skills-right">
                            <BsPencil className="icon-medium edit-icon" onClick={handleEditClick}/>
                        </div>
                    </div>
                    <div className="skills-footer">
                        <img
                            className="plus-button"
                            src="./plus-icon-80x80.png"
                            alt="Plus icon"
                            onClick={handleEditClick}
                        />
                        <h5>{cardConfig[cardNumber]?.heading}</h5>
                    </div>
                </div>
            ) : (
                <>
                    <Link to={cardConfig[cardNumber]?.to}>
                        <img
                            className="plus-button"
                            src="./plus-icon-80x80.png"
                            alt="Plus icon"
                            onClick={handleAddClick}
                        />
                    </Link>
                    <h5>{cardConfig[cardNumber]?.heading}</h5>
                </>
            )}
            {isModalOpen && (
                <EditModal onClose={handleCloseModal}
                           cardNumber={cardNumber} />
            )}
        </>     
    );
}

export default CardSkills;
