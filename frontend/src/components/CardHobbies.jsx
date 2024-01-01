import React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsPencil } from "react-icons/bs";
import { cardTypes, cardConfig, MAX_HOBBIES } from "../utilities/constants";
import { useData } from '../utilities/DataContext';

const CardHobbies = () => {

    const { userData, updateUserData } = useData();

    const [hobbiesCount, setHobbiesCount] = useState(0);
    const cardNumber = cardTypes.indexOf('Hobbies');
    
    useEffect(() => {
        if (userData.hobbies) {
            setHobbiesCount(userData.hobbies.length);
        }
      }, [userData.hobbies]);

    return (
        <>
            {userData.hobbies && userData.hobbies.length > 0 ? (
                <div className="hobby-container">
                    <div className="hobby-list">
                        <div className="hobby-left">
                            <ul>
                                {userData.hobbies.slice(0, MAX_HOBBIES).map((hobby, index) => (
                                    <li key={index} className="hobby-name">
                                        {hobby.description}
                                        <ul className="hobby-group">
                                            {hobby.snippet &&
                                                <li className="hobby-snippet">
                                                    {hobby.snippet}
                                                </li>
                                            }
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                            {hobbiesCount > MAX_HOBBIES ? (
                                <div className="hobbies-extra">and {hobbiesCount - MAX_HOBBIES} more...</div>
                            ) : null} 
                        </div>
                        <div className="hobby-right">
                            <Link to={cardConfig[cardNumber]?.to}>
                                <BsPencil className="icon-medium edit-icon"/>
                            </Link>
                        </div>    
                    </div>
                    <div className="hobby-footer">
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

export default CardHobbies;
