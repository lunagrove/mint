import React from 'react';
import { useState, useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { formatLongDate } from "../utilities/dates";

const Experience = ({ snippet, onDelete }) => {

    const [tags, setTags] = useState([]);

    useEffect(() => {
        let experienceTags = [];
        if (snippet.roleIds) {
            experienceTags.push(snippet.roleIds);
        }
        if (snippet.courseIds) {
            experienceTags.push(snippet.courseIds);
        }
        if (snippet.credentialIds) {
            experienceTags.push(snippet.credentialIds);
        }
        if (snippet.hobbyIds) {
            experienceTags.push(snippet.hobbyIds);
        }
        if (snippet.projectIds) {
            experienceTags.push(snippet.projectIds);
        }
        setTags(experienceTags);
    }, []);

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
                    <div className="experience-skills">
                        {snippet.skillIds && snippet.skillIds.length > 0 && snippet.skillIds.map((skill, index) => (
                            <div key={index} className="skill-rectangle">
                                {skill.description}
                            </div>
                        ))}
                    </div>
                    <div className="experience-tags">
                        {tags && tags.length > 0 && tags.map((tag, index) => (
                            <div key={index} className="skill-rectangle">
                                {tag}
                            </div>
                        ))}
                    </div>
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