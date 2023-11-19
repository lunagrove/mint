import React from 'react';
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";

const EditSkillRow = ({ skill, onDelete, onEdit }) => {

    const handleDeleteClick = () => {
        console.log('Delete Skill button clicked!');
        onDelete(skill);
    };

    const handleEditClick = () => {
        console.log('Edit Skill button clicked!');
        onEdit();
    };

    return (
        <li className="edit-skill-row"> 
            {skill && skill.description}
            <div className="edit-skill-icons">
                <BsPencil className="icon-medium edit-icon" onClick={handleEditClick}/>
                <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteClick}/>
            </div>
        </li>        
    );
}

export default EditSkillRow;
