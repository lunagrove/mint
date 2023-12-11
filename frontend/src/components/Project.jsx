import React from 'react';
import { useState } from 'react';
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";

const Project = ({ project, onDelete, onEdit }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(project.description);
    const [editedSnippet, setEditedSnippet] = useState(project.snippet);

    const handleDeleteClick = () => {
        onDelete(project.projectid);
    };
    
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onEdit(project.projectid, editedDescription, editedSnippet);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedDescription(project.description);
        setEditedSnippet(project.snippet);
    };

    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.value);
    };

    const handleSnippetChange = (e) => {
        setEditedSnippet(e.target.value);
    };

    return (
        <div className="page-row page-project-row ">
            <div className="page-info-block">
                <div className="page-info-project">
                    {isEditing ? (
                        <div className="page-edit-block">
                            <h5 className="form-label">Project name</h5>
                            <input
                                type="text"
                                className="page-edit-project form-input"
                                value={editedDescription}
                                onChange={handleDescriptionChange}
                            />
                        </div>
                    ) : (
                        <>
                            <h3 className="page-info-heading">
                                {project.description}
                            </h3>
                            <div className="page-edit-icons">
                                <BsPencil className="icon-medium edit-icon" onClick={handleEditClick} />
                                <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteClick} />
                            </div>
                        </>
                    )}
                </div>
                <div className="page-info-detail">
                    <div className="page-edit-info-details">
                        {isEditing ? (
                            <>
                                <h5 className="form-label">Description</h5>
                                <div className="page-edit-contents">
                                    <textarea className="form-textarea"
                                        id="snippet" 
                                        value={editedSnippet}
                                        rows="2"
                                        cols="120"
                                        onChange={handleSnippetChange}>
                                    </textarea>
                                    <div className="page-edit-icons">
                                        <FiCheckCircle className="icon-large save-icon" onClick={handleSaveClick} />
                                        <MdOutlineCancel className="icon-large cancel-icon" onClick={handleCancelClick} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <h3 className="page-project-description project-snippet" >{project.snippet}</h3>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;