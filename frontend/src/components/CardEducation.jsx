import React from 'react';
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { cardTypes, cardConfig } from "../utilities/constants";

const CardEducation = ({ institutions, refreshEducation }) => {

    const cardNumber = cardTypes.indexOf('Education');

    return (
        <>
            {institutions && institutions.length > 0 ? (
                <div className="education-container">
                    <div className="skills-list">
                        <div className="skills-left">
                            <ul>
                                {institutions.map((education, index) => (
                                    <li key={index}>
                                        {education.institution}
                                        <ul>
                                            {education.details.map((course) => (
                                                <li key={course.id}>
                                                    {course.description}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul> 
                        </div>
                        <div className="skills-right">
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
