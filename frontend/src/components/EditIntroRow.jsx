import React from 'react';
import { useState } from 'react';
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { formatLongDate } from "../utilities/dates";

const EditIntroRow = ({ statement, onDelete, onEdit, editingIntroId, setEditingIntroId }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(statement.snippet);

    const handleDeleteClick = () => {
        onDelete(statement.introid);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditingIntroId(statement.introid);    
    };

    const handleSaveClick = async () => {
        await onEdit(statement.introid, editedDescription);
        setIsEditing(false);
        setEditingIntroId(null);
    }
    
    const handleCancelClick = () => {
        setEditedDescription(statement.snippet);
        setIsEditing(false);
        setEditingIntroId(null);
    };
    
    const handleInputChange = (event) => {
        setEditedDescription(event.target.value);
    };

    return (
        <li className={`edit-intro-row ${editingIntroId !== null && editingIntroId !== statement.introid ? 'disabled' : ''}`}>
            {isEditing ? (
                <div className="intro-input-container">
                    <textarea className="intro-input"
                              id="statement" 
                              name="statement"
                              value={editedDescription}
                              rows="4"
                              cols="50"
                              onChange={handleInputChange} >
                    </textarea>
                    <div className="edit-intro-icons">
                        <FiCheckCircle className="icon-large save-icon" onClick={handleSaveClick}/>
                        <MdOutlineCancel className="icon-large cancel-icon" onClick={handleCancelClick}/>
                    </div>
                </div>
            ) : (
                <>
                    <div className="intro-item">
                        <VscDebugBreakpointLog className="icon-medium intro-bullet"/>
                        <p className="intro-text">{statement.snippet}</p>
                    </div>
                    <div className="intro-container">
                        <h5 className="intro-date">Created on: {formatLongDate(statement.createdon, false)}</h5>
                        <div className="edit-skill-icons">
                            <BsPencil className="icon-medium edit-icon" onClick={handleEditClick}/>
                            <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteClick}/>
                        </div>
                    </div>
                    
                </>
            )}

        </li>
    );
}

export default EditIntroRow;
