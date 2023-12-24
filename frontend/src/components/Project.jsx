import React from 'react';
import { useState } from 'react';
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import Dialog from './Dialog';

const Project = ({ project, onDelete, onEdit }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(project.description);
    const [editedSnippet, setEditedSnippet] = useState(project.snippet);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setDeleteDialogOpen(false);
        onDelete(project.projectid);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
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
        <div className={`project-row ${isEditing ? 'editing' : ''}`}>
            <div className="project-info">
                <h3 className="project-info-heading">
                    {project.description}
                </h3>
                <div className="project-edit-icons">
                    <BsPencil className="icon-medium edit-icon" onClick={handleEditClick} />
                    <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteClick} />
                </div>
            </div>
            <div className="project-info-detail">
                <div className="project-edit-info-details"> 
                    <h3 className="project-description project-snippet" >{project.snippet}</h3>   
                </div>
            </div>
            {isEditing && <div className={`project-overlay ${isEditing ? 'show' : 'hide'}`}></div>}
            {isEditing && (
                <div className={`project-edit-block ${isEditing ? 'show' : 'hide'}`}>
                    <h5 className="form-label">Project name</h5>
                    <input
                        type="text"
                        className="edit-project form-input"
                        value={editedDescription}
                        onChange={handleDescriptionChange}
                    />
                    <h5 className="form-label">Description</h5>
                    <div className="project-edit-contents">
                        <textarea className="form-textarea"
                            id="snippet" 
                            value={editedSnippet}
                            rows="2"
                            cols="160"
                            onChange={handleSnippetChange}>
                        </textarea>
                        <div className="project-edit-icons">
                            <FiCheckCircle className="icon-xlarge save-icon" onClick={handleSaveClick} />
                            <MdOutlineCancel className="icon-xlarge cancel-icon" onClick={handleCancelClick} />
                        </div>
                    </div>
                </div>
            )}
            {isDeleteDialogOpen && (
                <Dialog
                    type="Warning"
                    heading="Confirm Delete Project"
                    text="Are you sure you want to delete this project? If any experience snippets are tagged with this project, those tags will be removed."
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
}

export default Project;