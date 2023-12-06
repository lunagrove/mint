import React from 'react';
import { PiArrowElbowDownRightFill } from "react-icons/pi";
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { formatMonthandYear } from "../utilities/dates";

const Project = ({ project }) => {

    const handleDeleteClick = () => {
    
    };
    
    const handleEditClick = () => {
        
    };
    
    const handleDeleteCourseClick = () => {
        
    };
    
    const handleEditCourseClick = () => {
        
    };

    return (
        <div className="page-row">
            <div className="page-info-block">
                <div className="page-info-institution">
                    <h3 className="page-info-heading">
                        {project.description }
                    </h3>
                    <div className="page-edit-icons">
                        <BsPencil className="icon-medium edit-icon" onClick={handleEditClick}/>
                        <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteClick}/>
                    </div>
                </div>
                <div className="page-info-detail">
                    <div className="page-info-details">
                        <h3 className="page-info-description project-snippet" >{project.snippet}</h3>
                        <div className="page-row-edit-icons">
                            <BsPencil className="icon-medium edit-icon" onClick={handleEditCourseClick}/>
                            <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteCourseClick}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-add-detail">
                <img
                    className="plus-button plus-button-small"
                    src="./plus-icon-80x80.png"
                    alt="Plus icon"
                />
                <h5>Add project</h5>
            </div>
        </div>
    );
}

export default Project;