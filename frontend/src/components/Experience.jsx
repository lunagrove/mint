import React from 'react';
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { formatLongDate } from "../utilities/dates";

const Experience = ({ snippet, onDelete }) => {

    const handleDeleteClick = () => {
        onDelete(snippet.experienceid);
    };
    
    const handleEditClick = () => {
        
    };

    return (
        <div className="experience-row">
            <div className="experience-block">
                <VscDebugBreakpointLog className="icon-medium snippet-bullet"/>
                <div className="experience-details">
                    <h3 className="experience-snippet" >{snippet.snippet}</h3>
                    <h5 className="experience-date">Created on: {formatLongDate(snippet.createdon, false)}</h5>
                </div>
                <div className="experience-icons">
                    <BsPencil className="icon-medium edit-icon" onClick={handleEditClick}/>
                    <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteClick}/>
                </div>
            </div>
        </div>
    );
}

export default Experience;