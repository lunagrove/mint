import React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsPencil } from "react-icons/bs";
import { cardTypes, cardConfig, MAX_PROJECTS } from "../utilities/constants";
import { useData } from '../utilities/DataContext';

const CardProjects = () => {

    const { userData, updateUserData } = useData();

    const [projectsCount, setProjectsCount] = useState(0);
    const cardNumber = cardTypes.indexOf('Side Projects');
    
    useEffect(() => {
        if (userData.projects) {
            setProjectsCount(userData.projects.length);
        }
      }, [userData.projects]);

    return (
        <>
            {userData.projects && userData.projects.length > 0 ? (
                <div className="project-container">
                    <div className="project-list">
                        <div className="project-left">
                            <ul>
                                {userData.projects.slice(0, MAX_PROJECTS).map((project, index) => (
                                    <li key={index} className="project-name">
                                        {project.description}
                                        <ul className="project-group">
                                            <li className="project-snippet">
                                                {project.snippet}
                                            </li>
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                            {projectsCount > MAX_PROJECTS ? (
                                <div className="projects-extra">and {projectsCount - MAX_PROJECTS} more...</div>
                            ) : null} 
                        </div>
                        <div className="project-right">
                            <Link to={cardConfig[cardNumber]?.to}>
                                <BsPencil className="icon-medium edit-icon"/>
                            </Link>
                        </div>     
                    </div>
                    <div className="project-footer">
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

export default CardProjects;
