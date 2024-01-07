import React from 'react';
import { useState, useEffect } from "react";
import { PiArrowElbowDownRightFill } from "react-icons/pi";
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { formatMonthandYear } from "../utilities/dates";
import EditCourse from "../components/EditCourse";
import AddCourse from "../components/AddCourse";
import Dialog from './Dialog';

const Education = ({ education, onDelete, onDeleteCourse, onEdit, onEditCourse, onAddCourse }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedInstitution, setEditedInstitution] = useState(education.institution);
    const [editedLocation, setEditedLocation] = useState(education.location);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isDeleteCourseDialogOpen, setDeleteCourseDialogOpen] = useState(false);
    const [courseIdToDelete, setCourseIdToDelete] = useState(null);
    const [courseTypeToDelete, setCourseTypeToDelete] = useState('');
    const [isEditingCourse, setIsEditingCourse] = useState(false);
    const [courseToEdit, setCourseToEdit] = useState(null);
    const [isAddingCourse, setIsAddingCourse] = useState(false);

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setDeleteDialogOpen(false);
        onDelete(education.educationId);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
    };
    
    const handleEditClick = () => {
        setIsEditing(true);   
    };

    const handleSaveClick = () => {
        onEdit(education.educationId, editedInstitution, editedLocation);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedInstitution(education.institution);
        setEditedLocation(education.location);
    };

    const handleInstitutionChange = (e) => {
        setEditedInstitution(e.target.value);
    };

    const handleLocationChange = (e) => {
        setEditedLocation(e.target.value);
    };
    
    const handleDeleteCourseClick = (courseId, type) => {
        setDeleteCourseDialogOpen(true);
        setCourseIdToDelete(courseId);
        setCourseTypeToDelete(type);
    };

    const handleConfirmDeleteCourse = () => {
        setDeleteCourseDialogOpen(false);
        onDeleteCourse(education.educationId, courseIdToDelete, courseTypeToDelete); 
    };

    const handleCancelDeleteCourse = () => {
        setDeleteCourseDialogOpen(false);
    };
    
    const handleEditCourseClick = (course) => {
        setIsEditingCourse(true);
        setCourseToEdit(course);    
    };
    
    const handleSave = (educationId, courseId, description, type, fromDate, toDate, current) => {
        setIsEditingCourse(false);
        onEditCourse(educationId, courseId, description, type, fromDate, toDate, current);
    };

    const handleCancel = () => {
        setIsEditingCourse(false);
    };

    const handleAddCourseClick = () => {
        setIsAddingCourse(true);
    };

    const handleSubmit = (educationId, description, type, fromDate, toDate, current) => {
        setIsAddingCourse(false);
        onAddCourse(educationId, description, type, fromDate, toDate, current);
    };

    const handleClose = () => {
        setIsAddingCourse(false);
    };

    return (
        <div className={`education-row ${isEditing || isEditingCourse ? 'editing' : isAddingCourse ? 'adding' : ''}`}>
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
                                {item.current ? <p className="education-info-dates">To: Current</p>
                                              : <p className="education-info-dates">To: {formatMonthandYear(item.todate)}</p>}
                                <div className="education-row-edit-icons">
                                <BsPencil className="icon-medium edit-icon" onClick={() => handleEditCourseClick(item)}/>
                                    <IoTrashOutline className="icon-medium edit-icon" onClick={() => handleDeleteCourseClick(item.id, item.type)}/>
                                </div>
                            </div>
                        </div>
                        )
                    )}
                </div>
            </div>
            {isEditing && (
                <div className={`education-overlay ${isEditing ? 'show' : 'hide'}`}></div>)}
            {isEditing && (
                <div className={`education-edit-block ${isEditing ? 'show' : 'hide'}`}>
                    <h5 className="form-label">Institution name</h5>
                    <input
                        type="text"
                        className="edit-education-institution form-input"
                        value={editedInstitution}
                        onChange={handleInstitutionChange}
                    />
                    <h5 className="form-label">Location</h5>
                    <div className="education-edit-contents">
                        <input
                            type="text"
                            className="edit-education-location form-input"
                            value={editedLocation}
                            onChange={handleLocationChange}
                        />
                        <div className="education-edit-icons2">
                            <FiCheckCircle className="icon-xlarge save-icon" onClick={handleSaveClick} />
                            <MdOutlineCancel className="icon-xlarge cancel-icon" onClick={handleCancelClick} />
                        </div>
                    </div>
                </div>
            )}
            {isEditingCourse && (
                <div className={`education-overlay ${isEditingCourse ? 'show' : 'hide'}`}></div>)}
            {isEditingCourse && (
                <div className={`course-edit-block ${isEditingCourse ? 'show' : 'hide'}`}>
                    <EditCourse educationId={education.educationId}
                                course={courseToEdit}
                                onSave={handleSave}
                                onCancel={handleCancel} />    
                </div>
            )}
            <div className="education-add-detail">
                <img
                    className="plus-button plus-button-small"
                    src="./plus-icon-80x80.png"
                    alt="Plus icon"
                    onClick={handleAddCourseClick}
                />
                <h5>Add course or credential</h5>
            </div>
            {isAddingCourse && (
                <div className={`education-overlay ${isAddingCourse ? 'show' : 'hide'}`}></div>)}
            {isAddingCourse && (                  
                <div className={`course-add-block ${isAddingCourse ? 'show' : 'hide'}`}>
                    <AddCourse educationId={education.educationId}
                               onSubmit={handleSubmit}
                               onClose={handleClose} />
                </div>  
            )}
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
                    onConfirm={() => handleConfirmDeleteCourse(courseIdToDelete)}
                />
            )}
        </div>
    );
}

export default Education;