import React from 'react';
import CardProfile from "./CardProfile";
import CardSkills from "./CardSkills";
import { FaSpinner } from "react-icons/fa";
import { iconMap } from "./utilities/constants";
import { useState, useEffect } from "react";

const Card = ({
    cardType,
    cardNumber,
    profile,
    loadingProfile,
    skills,
    loadingSkills,
    refreshProfile,
    refreshSkills
    }) => {

    const [skillCount, setSkillCount] = useState(0);

    const IconComponent = iconMap[cardNumber];

    useEffect(() => {
        if (skills) {
            setSkillCount(skills.length);
        }
      }, [skills]);

    const handleClick = () => {
        console.log(`Add ${cardType} button clicked!`);
    };

    return (
        <div className="card">
            <div className="card-heading">
                {IconComponent && <IconComponent className="icon-large icon-margin-right" />}
                <h3>{cardType}</h3>
                {cardNumber === 5 && (
                    <h3>&nbsp;({skillCount})</h3>
                )}
            </div>
            <div className="card-content">               
                {cardNumber === 0 ? (
                    loadingProfile ? (
                        <FaSpinner className="spin icon-large" />
                    ) : (
                        <CardProfile profile={profile}
                                     refreshProfile={refreshProfile} />
                    )
                ) : cardNumber === 5 ? (
                        loadingSkills ? (
                            <FaSpinner className="spin icon-large" />
                        ) : (
                            <CardSkills skills={skills}
                                        refreshSkills={refreshSkills}/> 
                        )
                    ) : (
                        <>
                            <img
                                className="plus-button"
                                src="./plus-icon-80x80.png"
                                alt="Plus icon"
                                onClick={handleClick}
                            />
                            {cardNumber === 1 && (
                                <h5>Add companies and roles</h5>)}
                            {cardNumber === 2 && (
                                <h5>Add educational institutions, courses and credentials</h5>)}
                            {cardNumber === 3 && (
                                <h5>Add side projects</h5>)}
                            {cardNumber === 4 && (
                                <h5>Add hobbies and clubs</h5>)}
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default Card;
