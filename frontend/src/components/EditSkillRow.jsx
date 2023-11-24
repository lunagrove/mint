import React from 'react';
import { useState } from 'react';
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";

const EditSkillRow = ({ skill, onDelete, onEdit, editingSkillId, setEditingSkillId }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(skill.description);

    const handleDeleteClick = () => {
        onDelete(skill.skillid);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditingSkillId(skill.skillid);
    };

    const handleSaveClick = async () => {
        await onEdit(skill.skillid, editedDescription);
        setIsEditing(false);
        setEditingSkillId(null);
    }
    
    const handleCancelClick = () => {
        setEditedDescription(skill.description);
        setIsEditing(false);
        setEditingSkillId(null);
    };
    
    const handleInputChange = (event) => {
        setEditedDescription(event.target.value);
    };

    return (
        <li className={`edit-skill-row ${editingSkillId !== null && editingSkillId !== skill.skillid ? 'disabled' : ''}`}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        className="skill-input"
                        value={editedDescription}
                        onChange={handleInputChange}
                    />
                    <div className="edit-skill-icons">
                        <FiCheckCircle className="icon-large save-icon" onClick={handleSaveClick}/>
                        <MdOutlineCancel className="icon-large cancel-icon" onClick={handleCancelClick}/>
                    </div>
                </>
            ) : (
                <>
                    {skill && skill.description}
                    <div className="edit-skill-icons">
                        <BsPencil className="icon-medium edit-icon" onClick={handleEditClick}/>
                        <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteClick}/>
                    </div>
                </>
            )}
        </li>        
    );
}

export default EditSkillRow;
