import React from 'react';
import { useState } from 'react';
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { formatLongDate } from "../utilities/dates";

const EditIntroRow = ({ statement, onDelete }) => {

    const handleDeleteClick = () => {
        onDelete(statement.introid);
    };

    const handleEditClick = () => {
        
    };

    const handleSaveClick = async () => {
        
    }
    
    const handleCancelClick = () => {
        
    };
    
    const handleInputChange = (event) => {
        
    };

    return (
        <li>
            
            <div className="intro-row">
                <div className="intro-item">
                    <VscDebugBreakpointLog className="icon-medium intro-bullet"/>
                    <p className="intro-text">{statement.snippet}</p>
                </div>
                <div className="intro-container">
                    <h6 className="intro-date">Created on: {formatLongDate(statement.createdon, false)}</h6>
                    <div className="edit-skill-icons">
                        <BsPencil className="icon-medium edit-icon" onClick={handleEditClick}/>
                        <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteClick}/>
                    </div>
                </div>
                
            </div>
            

        </li>
    );
}

export default EditIntroRow;
