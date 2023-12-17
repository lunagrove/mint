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
        if (snippet.roles && snippet.roles.length > 0) {
            experienceTags.push(snippet.roles);
        }
        if (snippet.courses && snippet.courses.length > 0) {
            experienceTags.push(snippet.courses);
        }
        if (snippet.credentials && snippet.credentials.length > 0) {
            experienceTags.push(snippet.credentials);
        }
        if (snippet.hobbies && snippet.hobbies.length > 0) {
            experienceTags.push(snippet.hobbies);
        }
        if (snippet.projects && snippet.projects.length > 0) {
            experienceTags.push(snippet.projects);
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
                    <div className="experience-skills">
                        {snippet.skills && snippet.skills.length > 0 && snippet.skills.map((skill) => (
                            <div key={skill.id} className="tag-rectangle">
                                {skill.description}
                            </div>
                        ))}
                    </div>
                    <div className="experience-tags">
                        {tags && tags.length > 0 && tags.map((tag) => (
                            <div key={tag.id} className="tag-rectangle2">
                                {tag.description}
                            </div>
                        ))}
                    </div>
                    <h5 className="experience-date">Created on: {formatLongDate(snippet.createdOn, false)}</h5>
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