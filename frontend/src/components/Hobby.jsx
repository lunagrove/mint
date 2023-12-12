import React from 'react';
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";

const Hobby = ({ hobby, onDelete }) => {

    const handleDeleteClick = () => {
        onDelete(hobby.hobbyid);
    };
    
    const handleEditClick = () => {
        
    };

    return (
        <div className="hobby-row">
            <div className="hobby-info-block">
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
                    <div className="hobby-info-details">
                        <h3 className="hobby-description hobby-snippet" >{hobby.snippet}</h3>
                    </div>
                        
                </div>
            </div>
        </div>
    );
}

export default Hobby;