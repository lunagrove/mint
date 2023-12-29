import React from 'react';
import { useState, useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { formatLongDate } from "../utilities/dates";
import EditSnippet from './EditSnippet';
import Dialog from './Dialog';
import { useData } from '../utilities/DataContext';

const Experience = ({ snippet, onDelete, onEdit }) => {

    const { userData, updateUserData } = useData();

    const [isEditing, setIsEditing] = useState(false);
    const [editedSnippet, setEditedSnippet] = useState(snippet.snippet);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [skills, setSkills] = useState([]);
    const [tag, setTag] = useState('');
    const [tagType, setTagType] = useState('');

    useEffect(() => {
        const mapRoleIdToTag = (roleId) => {
            const company = userData.companies.find(company =>
                company.details && company.details.find(detail => detail.id === roleId)
            );
            if (company) {
                const matchingDetail = company.details.find(detail => detail.id === roleId);
                const tagObject = {
                    id: matchingDetail.id,
                    description: matchingDetail.description,
                    companyId: company.companyId,
                };
                return tagObject;
            }
            return {}; 
        };
        const mapCourseIdToTag = (courseId) => {
            const education = userData.education.find(education =>
                education.details && education.details.find(detail => detail.id === courseId)
            );
            if (education) {
                const matchingDetail = education.details.find(detail => detail.id === courseId);
                const tagObject = {
                    id: matchingDetail.id,
                    description: matchingDetail.description,
                    educationId: education.educationId
                };
                return tagObject;
            }
            return {}; 
        };
        const mapSkillIdsToTags = (skillIds) => {
            return skillIds.map(id => {
                let obj = {};
                obj = userData.skills.find(skill => skill.skillid === id);
                if (obj) {
                    const tagObject = {
                        id: obj.skillid,
                        description: obj.description
                    };
                    return tagObject;
                }
                return {}; 
            });
        };
        const mapHobbyIdToTag = (hobbyId) => {
            let obj = {};
            obj = userData.hobbies.find(hobby => hobby.hobbyid === hobbyId);
            if (obj) {
                const tagObject = {
                    id: obj.hobbyid,
                    description: obj.description
                };
                return tagObject;
            }
            return {}; 
           
        };
        const mapProjectIdToTag = (projectId) => {
            let obj = {};
            obj = userData.projects.find(project => project.projectid === projectId);
            if (obj) {
                const tagObject = {
                    id: obj.projectid,
                    description: obj.description
                };
                return tagObject;
            }
            return {}; 
        };
        const skillTags = snippet.skillids ? mapSkillIdsToTags(snippet.skillids) : [];
        if (snippet.tagtype === 'role') {
            const role = snippet.tagid ? mapRoleIdToTag(snippet.tagid) : [];
            setTag(role);
        }
        if (snippet.tagtype === 'hobby') {
            const hobby = snippet.tagid ? mapHobbyIdToTag(snippet.tagid) : [];
            setTag(hobby);
        }
        if (snippet.tagtype === 'project') {
            const project = snippet.tagid ? mapProjectIdToTag(snippet.tagid) : [];
            setTag(project);
        }
        if (snippet.tagtype === 'course') {
            const course = snippet.tagid ? mapCourseIdToTag(snippet.tagid) : [];
            setTag(course);
        }
        if (snippet.tagtype === 'credential') {
            const credential = snippet.tagid ? mapCourseIdToTag(snippet.tagid) : [];
            setTag(credential);
        }
        setSkills(skillTags);
        setTagType(snippet.tagtype);
    }, [snippet]);

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setDeleteDialogOpen(false);
        onDelete(snippet.experienceid);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
    };
    
    const handleEditClick = () => {
        setIsEditing(true);    
    };

    const handleSaveClick = () => {
        onEdit(snippet.experienceid, editedSnippet);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedSnippet(snippet.snippet);
    };

    return (
        <div className={`experience-row ${isEditing ? 'editing' : ''}`}>
            <div className="experience-block">
                <VscDebugBreakpointLog className="icon-medium snippet-bullet"/>
                <div className="experience-details">
                    <h3 className="experience-snippet" >{snippet.snippet}</h3>
                    <div className="experience-skills">
                        {skills && skills.length > 0 && skills.map((skill) => (
                            skill.id ? (
                                <div key={skill.id} className="tag-rectangle-grey">
                                    {skill.description}
                                </div>
                            ) : null
                        ))}
                    </div>
                    <div className="experience-tags">
                        {tag && (
                            <div key={tag.id} className={tagType === 'role' ? 'tag-rectangle-blue' : tagType === 'course' ? 'tag-rectangle-orange' : tagType === 'hobby' ? 'tag-rectangle-green' : tagType === 'credential' ? 'tag-rectangle-orange' : tagType === 'project' ? 'tag-rectangle-green' :''}>
                                {tag.description}
                            </div>
                        )}
                    </div>
                    <h5 className="experience-date">Created on: {formatLongDate(snippet.createdon, false)}</h5>
                </div>
                <div className="experience-icons">
                    <BsPencil className="icon-medium edit-icon" onClick={handleEditClick}/>
                    <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteClick}/>
                </div>
            </div>
            {isEditing && (
                <div className={`experience-overlay ${isEditing ? 'show' : 'hide'}`}></div>)}
            {isEditing && (
                <div className={`experience-edit-block ${isEditing ? 'show' : 'hide'}`}>
                    <EditSnippet snippet={snippet}
                                 onSave={handleSaveClick}
                                 onCancel={handleCancelClick} /> 
                </div>
            )}
            {isDeleteDialogOpen && (
                <Dialog
                    type="Warning"
                    heading="Confirm Delete Snippet"
                    text="Are you sure you want to delete this snippet?"
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
}

export default Experience;