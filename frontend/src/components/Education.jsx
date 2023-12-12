import React from 'react';
import { PiArrowElbowDownRightFill } from "react-icons/pi";
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { formatMonthandYear } from "../utilities/dates";

const Education = ({ education }) => {

    const handleDeleteClick = () => {
    
    };
    
    const handleEditClick = () => {
        
    };
    
    const handleDeleteCourseClick = () => {
        
    };
    
    const handleEditCourseClick = () => {
        
    };

    return (
        <div className="education-row">
            <div className="education-info-block">
                <div className="education-institution">
                    <h3 className="education-info-heading">
                        {education.institution}
                        {education.location && `, ${education.location}`}</h3>
                    <div className="education-edit-icons">
                        <BsPencil className="icon-medium edit-icon" onClick={handleEditClick}/>
                        <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteClick}/>
                    </div>
                </div>
                <div className="education-info-detail">
                    
                    {education.details.length > 0 && (education.details.map((item) =>
                        <div key={item.id} className="education-detail-block">
                            <PiArrowElbowDownRightFill className="icon-xlarge icon-margin-left" />
                            <div className="education-info-details">
                                <h3 className="education-info-description" >{item.description}</h3>
                                <p className="education-info-dates">From: {formatMonthandYear(item.fromdate)}</p>
                                {item.current ? <p>To: Current</p>
                                              : <p className="education-info-dates">To: {formatMonthandYear(item.todate)}</p>}
                                <div className="education-row-edit-icons">
                                    <BsPencil className="icon-medium edit-icon" onClick={handleEditCourseClick}/>
                                    <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteCourseClick}/>
                                </div>
                            </div>
                        </div>
                        )
                    )}
                </div>
            </div>
            <div className="education-add-detail">
                <img
                    className="plus-button plus-button-small"
                    src="./plus-icon-80x80.png"
                    alt="Plus icon"
                />
                <h5>Add course or credential</h5>
            </div>
        </div>
    );
}

export default Education;