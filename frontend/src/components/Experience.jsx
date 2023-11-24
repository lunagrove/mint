import React from 'react';
import { Link } from "react-router-dom";
import ExperiencePage from '../pages/ExperiencePage';

const Experience = () => {

    return (
        <div className="experience-container">
            <div className="card-heading">
                <img className="mint-leaf-medium" src="./Mint-leaf-transparent.png" alt="<Mint leaf>"/>
                <h2>Experience</h2>
            </div>
            <div className="experience-add">
                <Link to="/experience">
                    <img
                        className="plus-button plus-button-large"
                        src="./plus-icon-80x80.png"
                        alt="Plus icon"
                    />
                </Link>
                <h3>Add a new snippet</h3>
            </div>
        </div>
    );
}

export default Experience;