import React from 'react';
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";

const Project = ({ project, onDelete }) => {

    const handleDeleteClick = () => {
        onDelete(project.projectid);
    };
    
    const handleEditClick = () => {
        
    };

    return (
        <div className="page-row page-project-row">
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
                        <h3 className="page-project-description project-snippet" >{project.snippet}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;