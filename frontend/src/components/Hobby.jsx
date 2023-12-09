import React from 'react';
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";

const Hobby = ({ hobby, onDelete, onAdd }) => {

    const handleDeleteClick = () => {
        onDelete(hobby.hobbyid);
    };
    
    const handleEditClick = () => {
        
    };

    const handleAddClick = () => {
        onAdd();
    };

    return (
        <div className="page-row">
            <div className="page-info-block">
                <div className="page-info-institution">
                    <h3 className="page-info-heading">
                        {hobby.description}
                    </h3>
                    <div className="page-edit-icons">
                        <BsPencil className="icon-medium edit-icon" onClick={handleEditClick}/>
                        <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteClick}/>
                    </div>
                </div>
                <div className="page-info-detail">
                    <div className="page-info-details">
                        <h3 className="page-hobby-description hobby-snippet" >{hobby.snippet}</h3>
                    </div>
                        
                </div>
            </div>
            <div className="page-add-detail">
                <img
                    className="plus-button plus-button-small"
                    src="./plus-icon-80x80.png"
                    alt="Plus icon"
                    onClick={handleAddClick}
                />
                <h5>Add hobby</h5>
            </div>
        </div>
    );
}

export default Hobby;