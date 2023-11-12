import React from 'react';
import CardProfile from "./CardProfile";
import { FaSpinner } from "react-icons/fa";

const Card = ({ cardType, profile, loading }) => {

    const handleClick = () => {
        console.log(`${cardType} button clicked!`);
    };

    return (
        <div className="card">
            <div className="card-heading">
                <img className="mint-leaf-small" src="./Mint-leaf-transparent.png" alt="<Mint leaf>"/>
                <h3>{cardType}</h3>
            </div>
            <div className="card-content">               
                {cardType === 'Profile' ? (
                    loading ? (
                        <FaSpinner className="spin icon-large" />
                    ) : (
                        <CardProfile profile={profile} />
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
