import React from 'react';
import { useState } from "react";
import { PiArrowElbowDownRightFill } from "react-icons/pi";
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { formatMonthandYear } from "../utilities/dates";
import Dialog from './Dialog';

const Education = ({ education, onDelete, onDeleteCourse }) => {

    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isDeleteCourseDialogOpen, setDeleteCourseDialogOpen] = useState(false);
    const [courseIdToDelete, setCourseIdToDelete] = useState(null);
    const [courseType, setCourseType] = useState(null);

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setDeleteDialogOpen(false);
        onDelete(education.educationid);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
    };
    
    const handleEditClick = () => {
        
    };
    
    const handleDeleteCourseClick = (courseId, type) => {
        setDeleteCourseDialogOpen(true);
        setCourseIdToDelete(courseId);
        setCourseType(type);
    };

    const handleConfirmDeleteCourse = (courseId, type) => {
        setDeleteCourseDialogOpen(false);
        onDeleteCourse(education.educationid, courseId, type); 
    };

    const handleCancelDeleteCourse = () => {
        setDeleteCourseDialogOpen(false);
    };
    
    const handleEditCourseClick = () => {
        
    };

    return (
        <div className="education-row">
            <div className="education-info-block">
                <div className="education-institution">
                    <h3 className="education-info-heading">
                        {education.institution}
                        {education.location && `, ${education.location}`}</h3>
                    <div className="education-edit-icons">
                        <BsPencil className="icon-medium edit-icon" onClick={handleEditClick}/>
                        <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteClick}/>
                    </div>
                </div>
                <div className="education-info-detail">
                    
                    {education.details.length > 0 && (education.details.map((item) =>
                        <div key={item.id} className="education-detail-block">
                            <PiArrowElbowDownRightFill className="icon-xlarge icon-margin-left" />
                            <div className="education-info-details">
                                <h3 className="education-info-description" >{item.description}</h3>
                                <p className="education-info-dates">From: {formatMonthandYear(item.fromdate)}</p>
                                {item.current ? <p>To: Current</p>
                                              : <p className="education-info-dates">To: {formatMonthandYear(item.todate)}</p>}
                                <div className="education-row-edit-icons">
                                    <BsPencil className="icon-medium edit-icon" onClick={handleEditCourseClick}/>
                                    <IoTrashOutline className="icon-medium edit-icon" onClick={() => handleDeleteCourseClick(item.id, item.type)}/>
                                </div>
                            </div>
                        </div>
                        )
                    )}
                </div>
            </div>
            <div className="education-add-detail">
                <img
                    className="plus-button plus-button-small"
                    src="./plus-icon-80x80.png"
                    alt="Plus icon"
                />
                <h5>Add course or credential</h5>
            </div>
            {isDeleteDialogOpen && (
                <Dialog
                    type="Warning"
                    heading="Confirm Delete Institution"
                    text="Are you sure you want to delete this institution? Deleting it will also delete any associated courses and credentials. If any experience snippets are tagged with these courses or credentials, those tags will be removed."
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                />
            )}
            {isDeleteCourseDialogOpen && (
                <Dialog
                    type="Warning"
                    heading="Confirm Delete Course/Credential"
                    text="Are you sure you want to delete this course/credential? If any experience snippets are tagged with this course/credential, those tags will be removed."
                    onCancel={handleCancelDeleteCourse}
                    onConfirm={() => handleConfirmDeleteCourse(courseIdToDelete, courseType)}
                />
            )}
        </div>
    );
}

export default Education;