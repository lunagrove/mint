import React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsPencil } from "react-icons/bs";
import { cardTypes, cardConfig, MAX_EDUCATION } from "../utilities/constants";
import { useData } from '../utilities/DataContext';

const CardEducation = () => {

    const { userData, updateUserData } = useData();

    const [educationCount, setEducationCount] = useState(0);
    const cardNumber = cardTypes.indexOf('Education');
    
    useEffect(() => {
        if (userData.education) {
            setEducationCount(userData.education.length);
        }
      }, [userData.education]);

    return (
        <>
            {userData.education && userData.education.length > 0 ? (
                <div className="education-container">
                    <div className="education-list">
                        <div className="education-left">
                            <ul>
                                {userData.education.slice(0, MAX_EDUCATION).map((education, index) => (
                                    <li key={index} className="education-name">
                                        {education.institution}
                                        <ul className="education-group">
                                            {education.details.map((course) => (
                                                <li key={course.id} className="education-credential">
                                                    {course.description}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                            {educationCount > MAX_EDUCATION ? (
                                <div className="education-extra">and {educationCount - MAX_EDUCATION} more...</div>
                            ) : null} 
                        </div>
                        <div className="education-right">
                            <Link to={cardConfig[cardNumber]?.to}>
                                <BsPencil className="icon-medium edit-icon"/>
                            </Link>
                        </div>
                    </div>
                    <div className="education-footer">
                        <Link to={cardConfig[cardNumber]?.to}>
                            <img
                                className="plus-button"
                                src="./plus-icon-80x80.png"
                                alt="Plus icon"
                            />
                        </Link>
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
                        />
                    </Link>
                    <h5>{cardConfig[cardNumber]?.heading}</h5>
                </>
            )}
        </>     
    );
}

export default CardEducation;
