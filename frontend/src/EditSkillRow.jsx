import React from 'react';
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";

const EditSkillRow = ({ skill }) => {

    const handleDeleteClick = () => {
        console.log('Delete Skill button clicked!');
    };

    const handleEditClick = () => {
        console.log('Edit Skill button clicked!');
    };

    return (
        <li className="edit-skill-row"> 
            {skill.description}
            <div className="edit-skill-icons">
                <BsPencil className="icon-medium edit-icon" onClick={handleEditClick}/>
                <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteClick}/>
            </div>
        </li>        
    );
}

export default EditSkillRow;
