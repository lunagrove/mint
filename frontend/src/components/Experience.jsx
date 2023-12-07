import React from 'react';
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { formatLongDate } from "../utilities/dates";

const Experience = ({ snippet }) => {

    const handleDeleteClick = () => {
    
    };
    
    const handleEditClick = () => {
        
    };
    
    const handleDeleteCourseClick = () => {
        
    };
    
    const handleEditCourseClick = () => {
        
    };

    return (
        <div className="page-row">
            <div className="page-info-block">
                <div className="page-info-detail">
                    <div className="page-exp-details">
                        <VscDebugBreakpointLog className="icon-medium snippet-bullet"/>
                        <h3 className="experience-snippet" >{snippet.snippet}</h3>
                        <div className="page-row-edit-icons page-row-exp-icons">
                            <BsPencil className="icon-medium edit-icon" onClick={handleEditCourseClick}/>
                            <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteCourseClick}/>
                        </div>
                    </div>
                    <h5 className="experience-date">Created on: {formatLongDate(snippet.createdon, false)}</h5>
                </div>
            </div>
            <div className="page-add-detail">
                <img
                    className="plus-button plus-button-small"
                    src="./plus-icon-80x80.png"
                    alt="Plus icon"
                />
                <h5>Add snippet</h5>
            </div>
        </div>
    );
}

export default Experience;