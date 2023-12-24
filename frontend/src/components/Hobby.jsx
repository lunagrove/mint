import React from 'react';
import { useState } from 'react';
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import Dialog from './Dialog';

const Hobby = ({ hobby, onDelete, onEdit }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(hobby.description);
    const [editedSnippet, setEditedSnippet] = useState(hobby.snippet);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setDeleteDialogOpen(false);
        onDelete(hobby.hobbyid);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
    };
    
    const handleEditClick = () => {
        setIsEditing(true);    
    };

    const handleSaveClick = () => {
        onEdit(hobby.hobbyid, editedDescription, editedSnippet);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedDescription(hobby.description);
        setEditedSnippet(hobby.snippet);
    };

    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.value);
    };

    const handleSnippetChange = (e) => {
        setEditedSnippet(e.target.value);
    };

    return (
        <div className={`hobby-row ${isEditing ? 'editing' : ''}`}>
            <div className="hobby-info">
                <h3 className="hobby-info-heading">
                    {hobby.description}
                </h3>
                <div className="hobby-edit-icons">
                    <BsPencil className="icon-medium edit-icon" onClick={handleEditClick}/>
                    <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteClick}/>
                </div>
            </div>
            <div className="hobby-info-detail">
                <div className="hobby-edit-info-details">    
                    <h3 className="hobby-description hobby-snippet" >{hobby.snippet}</h3>  
                </div>    
            </div>
            {isEditing && <div className={`hobby-overlay ${isEditing ? 'show' : 'hide'}`}></div>}
            {isEditing && (
                <div className={`hobby-edit-block ${isEditing ? 'show' : 'hide'}`}>
                    <h5 className="form-label">Hobby name</h5>
                    <input
                        type="text"
                        className="edit-hobby form-input"
                        value={editedDescription}
                        onChange={handleDescriptionChange}
                    />
                    <h5 className="form-label">Description</h5>
                    <div className="hobby-edit-contents">
                        <textarea className="form-textarea"
                            id="snippet" 
                            value={editedSnippet}
                            rows="2"
                            cols="160"
                            onChange={handleSnippetChange}>
                        </textarea>
                        <div className="hobby-edit-icons">
                            <FiCheckCircle className="icon-xlarge save-icon" onClick={handleSaveClick} />
                            <MdOutlineCancel className="icon-xlarge cancel-icon" onClick={handleCancelClick} />
                        </div>
                    </div>
                </div>
            )}
            {isDeleteDialogOpen && (
                <Dialog
                    type="Warning"
                    heading="Confirm Delete Hobby/Club"
                    text="Are you sure you want to delete this hobby/club? If any experience snippets are tagged with this hobby/club, those tags will be removed."
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                />
            )}      
        </div>
    );
}

export default Hobby;