import React from 'react';
import { Link } from "react-router-dom";
import CardProfile from "./CardProfile";
import CardSkills from "./CardSkills";
import CardEducation from "./CardEducation";
import CardCompanies from "./CardCompanies";
import CardHobbies from "./CardHobbies";
import CardProjects from "./CardProjects";
import { FaSpinner } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { iconMap, cardConfig } from "../utilities/constants";
import { useState, useEffect } from "react";
import { useData } from '../utilities/DataContext';

const Card = ({
    cardType,
    cardNumber,
    loadingProfile,
    refreshProfile,
    refreshIntro,
    loadingSkills,
    refreshSkills,
    loadingEducation,
    refreshEducation,
    loadingCompanies,
    refreshCompanies,
    loadingHobbies,
    refreshHobbies,
    loadingProjects,
    refreshProjects
    }) => {

    const { userData, updateUserData } = useData();

    const [skillCount, setSkillCount] = useState(0);
    const [educationCount, setEducationCount] = useState(0);
    const [companiesCount, setCompaniesCount] = useState(0);
    const [hobbiesCount, setHobbiesCount] = useState(0);
    const [projectsCount, setProjectsCount] = useState(0);

    const [isSpinningProfile, setIsSpinningProfile] = useState(false);
    const [isSpinningSkills, setIsSpinningSkills] = useState(false);
    const [isSpinningEducation, setIsSpinningEducation] = useState(false);
    const [isSpinningCompanies, setIsSpinningCompanies] = useState(false);
    const [isSpinningHobbies, setIsSpinningHobbies] = useState(false);
    const [isSpinningProjects, setIsSpinningProjects] = useState(false);

    const IconComponent = iconMap[cardNumber];

    useEffect(() => {
        if (userData.skills) {
            setSkillCount(userData.skills.length);
        }
    }, [userData.skills]);

    useEffect(() => {
        if (userData.education) {
            setEducationCount(userData.education.length);
        }
    }, [userData.education]);

    useEffect(() => {
        if (userData.companies) {
            setCompaniesCount(userData.companies.length);
        }
    }, [userData.companies]);

    useEffect(() => {
        if (userData.hobbies) {
            setHobbiesCount(userData.hobbies.length);
        }
    }, [userData.hobbies]);

    useEffect(() => {
        if (userData.projects) {
            setProjectsCount(userData.projects.length);
        }
    }, [userData.projects]);

    useEffect(() => {
        setIsSpinningProfile(false);
    }, [userData.profile]);

    useEffect(() => {
        setIsSpinningSkills(false);
    }, [userData.skills]);

    useEffect(() => {
        setIsSpinningEducation(false);
    }, [userData.education]);

    useEffect(() => {
        setIsSpinningCompanies(false);
    }, [userData.companies]);

    useEffect(() => {
        setIsSpinningHobbies(false);
    }, [userData.hobbies]);

    useEffect(() => {
        setIsSpinningProjects(false);
    }, [userData.projects]);

    const handleRefreshProfile = () => {
        setIsSpinningProfile(true);
        refreshProfile();
        refreshIntro();
    };

    const handleRefreshCompanies = () => {
        setIsSpinningCompanies(true);
        refreshCompanies();
    };

    const handleRefreshEducation = () => {
        setIsSpinningEducation(true);
        refreshEducation();
    };

    const handleRefreshSkills = () => {
        setIsSpinningSkills(true);
        refreshSkills();
    };

    const handleRefreshHobbies = () => {
        setIsSpinningHobbies(true);
        refreshHobbies();
    };

    const handleRefreshProjects = () => {
        setIsSpinningProjects(true);
        refreshProjects();
    };

    return (
        <div className="card">
            <div className="card-heading">
                {IconComponent && <IconComponent className="icon-large icon-margin-right" />}
                <h3>{cardType}</h3>
                {cardNumber === 1 && (
                    <h3>&nbsp;({companiesCount})</h3>
                )}
                {cardNumber === 2 && (
                    <h3>&nbsp;({educationCount})</h3>
                )}
                {cardNumber === 3 && (
                    <h3>&nbsp;({projectsCount})</h3>
                )}
                {cardNumber === 4 && (
                    <h3>&nbsp;({hobbiesCount})</h3>
                )}
                {cardNumber === 5 && (
                    <h3>&nbsp;({skillCount})</h3>
                )}
                <div className="card-heading-refresh">
                    {cardNumber === 0 &&
                        <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningProfile ? 'spin' : ''}`}
                                     onClick={handleRefreshProfile} />
                    }
                    {cardNumber === 1 &&
                        <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningCompanies ? 'spin' : ''}`}
                                     onClick={handleRefreshCompanies} />
                    }
                    {cardNumber === 2 &&
                        <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningEducation ? 'spin' : ''}`}
                                     onClick={handleRefreshEducation} />
                    }
                    {cardNumber === 3 &&
                        <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningProjects ? 'spin' : ''}`}
                                     onClick={handleRefreshProjects} />
                    }
                    {cardNumber === 4 &&
                        <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningHobbies ? 'spin' : ''}`}
                                     onClick={handleRefreshHobbies} />
                    }
                    {cardNumber === 5 &&
                        <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningSkills ? 'spin' : ''}`}
                                     onClick={handleRefreshSkills} />
                    }
                </div>
            </div>
            <div className="card-content">               
                {cardNumber === 0 ? (
                    loadingProfile ? (
                        <FaSpinner className="spin icon-large" />
                    ) : (
                        <CardProfile />
                    )
                ) : cardNumber === 5 ? (
                        loadingSkills ? (
                            <FaSpinner className="spin icon-large" />
                        ) : (
                            <CardSkills /> 
                        )
                    ) : cardNumber === 1 ? (
                            loadingCompanies ? (
                                <FaSpinner className="spin icon-large" />
                            ) : (
                                <CardCompanies /> 
                            )
                        ) : cardNumber === 2 ? (
                                loadingEducation ? (
                                    <FaSpinner className="spin icon-large" />
                                ) : (
                                    <CardEducation /> 
                                )
                            ) : cardNumber === 3 ? (
                                    loadingProjects ? (
                                        <FaSpinner className="spin icon-large" />
                                    ) : (
                                        <CardProjects /> 
                                    )
                                ) : cardNumber === 4 &&
                                        loadingHobbies ? (
                                            <FaSpinner className="spin icon-large" />
                                        ) : (
                                            <CardHobbies /> 
                                        )
                }
            </div>
        </div>
    );
}

export default Card;
