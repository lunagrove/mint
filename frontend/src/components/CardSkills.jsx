import React from 'react';
import { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { cardTypes, MAX_SKILLS, cardConfig } from "../utilities/constants";
import EditModal from './EditModal';

const CardSkills = ({ skills, refreshSkills }) => {

    const [isModalOpen, setModalOpen] = useState(false);
    const cardNumber = cardTypes.indexOf('Skills');

    const handleEditClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        refreshSkills();
    };

    const handleAddClick = () => {
        console.log('Add Skills button clicked!');
        setModalOpen(true);
    };

    const skillCount = skills.length;

    return (
        <>
            {skills && skills.length > 0 ? (
                <div className="skills-container">
                    <div className="skills-list">
                        <div className="skills-left">

                            <div className="skills-inner">
                                {skills.slice(0, MAX_SKILLS).map((skill, index) => (
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
                <img
                    className="plus-button"
                    src="./plus-icon-80x80.png"
                    alt="Plus icon"
                    onClick={handleAddClick}
                />  
            )}
            {isModalOpen && (
                <EditModal onClose={handleCloseModal}
                           cardNumber={cardNumber}
                           skills={skills} />
            )}
        </>     
    );
}

export default CardSkills;
