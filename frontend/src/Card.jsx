import React from 'react';
import CardProfile from "./CardProfile";
import CardSkills from "./CardSkills";
import { FaSpinner } from "react-icons/fa";
import { iconMap } from "./utilities/constants";

const Card = ({
    cardType,
    cardNumber,
    profile,
    loadingProfile,
    skills,
    loadingSkills
    }) => {

    const IconComponent = iconMap[cardNumber];
    let skillCount = 0;

    if (skills) {
        skillCount = skills.length;
    }

    const handleClick = () => {
        console.log(`${cardType} button clicked!`);
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
                        <CardProfile profile={profile} />
                    )
                ) : cardNumber === 5 ? (
                        loadingSkills ? (
                            <FaSpinner className="spin icon-large" />
                        ) : (
                            skillCount > 0 ? (
                                <CardSkills skills={skills}/> 
                            ) : (
                                <img
                                    className="plus-button"
                                    src="./plus-icon-80x80.png"
                                    alt="Plus icon"
                                    onClick={handleClick}
                                />
                            )
                        )
                    ) : (
                        <img
                            className="plus-button"
                            src="./plus-icon-80x80.png"
                            alt="Plus icon"
                            onClick={handleClick}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default Card;
