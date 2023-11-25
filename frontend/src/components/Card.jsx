import React from 'react';
import { Link } from "react-router-dom";
import CardProfile from "./CardProfile";
import CardSkills from "./CardSkills";
import { FaSpinner } from "react-icons/fa";
import { iconMap } from "../utilities/constants";
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

    const cardConfig = {
        1: { to: '/companies', heading: 'Add companies and roles' },
        2: { to: '/education', heading: 'Add educational institutions, courses, and credentials' },
        3: { to: '/projects', heading: 'Add side projects' },
        4: { to: '/hobbies', heading: 'Add hobbies and clubs' },
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
                            <Link to={cardConfig[cardNumber]?.to}>
                                <img
                                    className="plus-button"
                                    src="./plus-icon-80x80.png"
                                    alt="Plus icon"
                                />
                            </Link>
                            <h5>{cardConfig[cardNumber]?.heading}</h5>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default Card;
