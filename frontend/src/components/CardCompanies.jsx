import React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsPencil } from "react-icons/bs";
import { cardTypes, cardConfig, MAX_COMPANIES } from "../utilities/constants";
import { useData } from '../utilities/DataContext';

const CardCompanies = () => {

    const { userData, updateUserData } = useData();

    const [companiesCount, setCompaniesCount] = useState(0);
    const cardNumber = cardTypes.indexOf('Companies');
    
    useEffect(() => {
        if (userData.companies) {
            setCompaniesCount(userData.companies.length);
        }
      }, [userData.companies]);

    return (
        <>
            {userData.companies && userData.companies.length > 0 ? (
                <div className="companies-container">
                    <div className="companies-list">
                        <div className="companies-left">
                            <ul>
                                {userData.companies.slice(0, MAX_COMPANIES).map((company) => (
                                    <li key={company.companyId} className="company-name">
                                        {company.companyName}
                                        <ul className="companies-group">
                                            {company.details.map((role) => (
                                                <li key={role.id} className="company-role">
                                                    {role.description}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                            {companiesCount > MAX_COMPANIES ? (
                                <div className="companies-extra">and {companiesCount - MAX_COMPANIES} more...</div>
                            ) : null} 
                        </div>
                        <div className="companies-right">
                            <Link to={cardConfig[cardNumber]?.to}>
                                <BsPencil className="icon-medium edit-icon"/>
                            </Link>
                        </div>
                    </div>
                    <div className="companies-footer">
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

export default CardCompanies;
