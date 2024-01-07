import React from 'react';
import { Link } from "react-router-dom";

const ExperienceBanner = ({ snippetCount }) => {

    return (
        <div className="experience-container">
            <div className="card-heading">
                <img className="mint-leaf-medium" src="./Mint-leaf-transparent.png" alt="<Mint leaf>"/>
                <h2>Experience ({snippetCount})</h2>
            </div>
            <div className="experience-buttons">
                <div className="experience-add">
                    <Link to="/experience">
                        <img
                            className="plus-button plus-button-large"
                            src="./plus-icon-80x80.png"
                            alt="Plus icon"
                        />
                    </Link>
                    <h3>Add a Snippet</h3>
                </div>
                <div className="experience-resume">
                    <Link to="/resume">
                        <img
                            className="plus-button plus-button-large"
                            src="./hammer-icon-80x80.png"
                            alt="Plus icon"
                        />
                    </Link>
                    <h3>Build a Resume</h3>
                </div>
            </div>
        </div>
    );
}

export default ExperienceBanner;
