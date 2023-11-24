import React from 'react';
import { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { cardTypes, MAX_SKILLS } from "../utilities/constants";
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
                            <ul>
                                {skills.slice(0, MAX_SKILLS).map((skill, index) => (
                                    <li key={index}>{skill.description}</li>
                                ))}
                                {skillCount > MAX_SKILLS ? (
                                        <li className="skills-extra">and {skillCount - MAX_SKILLS} more...</li>
                                    ) : null}
                            </ul> 
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
                        <h5>Add skills</h5>
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
