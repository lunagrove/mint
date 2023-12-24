import React from 'react';
import { useState, useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { formatLongDate } from "../utilities/dates";
import Dialog from './Dialog';

const Experience = ({ snippet, onDelete, onEdit }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedSnippet, setEditedSnippet] = useState(snippet.snippet);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [tags, setTags] = useState([]);

    useEffect(() => {
        let experienceTags = [];
        if (snippet.roles && snippet.roles.length > 0) {
            experienceTags.push(snippet.roles);
        }
        if (snippet.courses && snippet.courses.length > 0) {
            experienceTags.push(snippet.courses);
        }
        if (snippet.credentials && snippet.credentials.length > 0) {
            experienceTags.push(snippet.credentials);
        }
        if (snippet.hobbies && snippet.hobbies.length > 0) {
            experienceTags.push(snippet.hobbies);
        }
        if (snippet.projects && snippet.projects.length > 0) {
            experienceTags.push(snippet.projects);
        }
        setTags(...experienceTags);
    }, []);

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setDeleteDialogOpen(false);
        onDelete(snippet.experienceId);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
    };
    
    const handleEditClick = () => {
        setIsEditing(true);    
    };

    const handleSaveClick = () => {
        onEdit(snippet.snippetid, editedSnippet);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedSnippet(snippet.snippet);
    };

    const handleSnippetChange = (e) => {
        setEditedSnippet(e.target.value);
    };

    return (
        <div className={`experience-row ${isEditing ? 'editing' : ''}`}>
            <div className="experience-block">
                <VscDebugBreakpointLog className="icon-medium snippet-bullet"/>
                <div className="experience-details">
                    <h3 className="experience-snippet" >{snippet.snippet}</h3>
                    <div className="experience-skills">
                        {snippet.skills && snippet.skills.length > 0 && snippet.skills.map((skill) => (
                            <div key={skill.id} className="tag-rectangle">
                                {skill.description}
                            </div>
                        ))}
                    </div>
                    <div className="experience-tags">
                        {tags && tags.length > 0 && tags.map((tag) => (
                            <div key={tag.id} className="tag-rectangle2">
                                {tag.description}
                            </div>
                        ))}
                    </div>
                    <h5 className="experience-date">Created on: {formatLongDate(snippet.createdOn, false)}</h5>
                </div>
                <div className="experience-icons">
                    <BsPencil className="icon-medium edit-icon" onClick={handleEditClick}/>
                    <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteClick}/>
                </div>
            </div>
            {isEditing && <div className={`experience-overlay ${isEditing ? 'show' : 'hide'}`}></div>}
            {isEditing && (
                <div className={`experience-edit-block ${isEditing ? 'show' : 'hide'}`}>
                    <h5 className="form-label">Description</h5>
                    <div className="experience-edit-contents">
                        <textarea className="form-textarea"
                            id="snippet" 
                            value={editedSnippet}
                            rows="2"
                            cols="160"
                            onChange={handleSnippetChange}>
                        </textarea>
                        <div className="experience-edit-icons">
                            <FiCheckCircle className="icon-large save-icon" onClick={handleSaveClick} />
                            <MdOutlineCancel className="icon-large cancel-icon" onClick={handleCancelClick} />
                        </div>
                    </div>
                </div>
            )}
            {isDeleteDialogOpen && (
                <Dialog
                    type="Warning"
                    heading="Confirm Delete Snippet"
                    text="Are you sure you want to delete this snippet?"
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
}

export default Experience;