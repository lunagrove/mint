import React from 'react';
import { useState, useEffect } from "react";
import { PiArrowElbowDownRightFill } from "react-icons/pi";
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { formatMonthandYear, formatFirstOfMonthDate } from "../utilities/dates";
import { monthNames, educationTypes } from "../utilities/constants";
import Dialog from './Dialog';
import SelectYear from "./SelectYear";

const Education = ({ education, onDelete, onDeleteCourse, onEdit, onEditCourse }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedInstitution, setEditedInstitution] = useState(education.institution);
    const [editedLocation, setEditedLocation] = useState(education.location);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isDeleteCourseDialogOpen, setDeleteCourseDialogOpen] = useState(false);
    const [courseIdToDelete, setCourseIdToDelete] = useState(null);
    const [isEditingCourse, setIsEditingCourse] = useState(false);
    const [editedCourseDescription, setEditedCourseDescription] = useState('');
    const [editedType, setEditedType] = useState('course');
    const [editedFromMonth, setEditedFromMonth] = useState('');
    const [editedFromYear, setEditedFromYear] = useState('');
    const [editedToMonth, setEditedToMonth] = useState('');
    const [editedToYear, setEditedToYear] = useState('');
    const [editedCurrent, setEditedCurrent] = useState(false);
    const [courseToEdit, setCourseToEdit] = useState(null);

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
    
    const handleDeleteCourseClick = (courseId) => {
        setDeleteCourseDialogOpen(true);
        setCourseIdToDelete(courseId);
    };

    const handleConfirmDeleteCourse = (courseId) => {
        setDeleteCourseDialogOpen(false);
        onDeleteCourse(education.educationId, courseId); 
    };

    const handleCancelDeleteCourse = () => {
        setDeleteCourseDialogOpen(false);
    };
    
    const handleEditCourseClick = (course) => {
        setIsEditingCourse(true);
        setCourseToEdit(course);    
    };

    useEffect(() => {
        if (courseToEdit) {
            setEditedCourseDescription(courseToEdit.description);
            setEditedType(courseToEdit.type);
            var courseFromDate = formatMonthandYear(courseToEdit.fromdate);
            var parts = courseFromDate.split(' ');
            setEditedFromMonth(parts[0]);
            setEditedFromYear(parts[1]);
            var courseToDate = formatMonthandYear(courseToEdit.todate);
            parts = courseToDate.split(' ');
            setEditedToMonth(parts[0]);      
            setEditedToYear(parts[1]);
            setEditedCurrent(courseToEdit.current);
        }
    }, [isEditingCourse]);

    const handleCourseSaveClick = () => {
        const editedFromDate = formatFirstOfMonthDate(editedFromYear, editedFromMonth);
        const editedToDate = formatFirstOfMonthDate(editedToYear, editedToMonth);
        setIsEditingCourse(false);
        onEditCourse(education.educationId, courseToEdit.id, editedType, editedCourseDescription, editedFromDate, editedToDate, editedCurrent);
    };

    const handleCourseCancelClick = () => {
        setIsEditingCourse(false);
    };

    const handleCourseDescriptionChange = (e) => {
        setEditedCourseDescription(e.target.value);
    };

    const handleTypeChange = (e) => {
        setEditedType(e.target.value);
    };

    const handleFromMonthChange = (e) => {
        setEditedFromMonth(e.target.value);
    };

    const handleFromYearChange = (newValue) => {
        setEditedFromYear(newValue);
    };

    const handleToMonthChange = (e) => {
        setEditedToMonth(e.target.value);
    };

    const handleToYearChange = (newValue) => {
        setEditedToYear(newValue);
    };

    const handleCurrentChange = (e) => {
        setEditedCurrent(e.target.checked);
    };

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

    return (
        <div className={`education-row ${isEditing || isEditingCourse ? 'editing' : ''}`}>
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
                                <BsPencil className="icon-medium edit-icon" onClick={() => handleEditCourseClick(item)}/>
                                    <IoTrashOutline className="icon-medium edit-icon" onClick={() => handleDeleteCourseClick(item.id)}/>
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
                <div className={`education-overlay ${isEditing ? 'show' : 'hide'}`}></div>)}
            {isEditingCourse && (
                <div className={`course-edit-block ${isEditingCourse ? 'show' : 'hide'}`}>
                    <div className="edit-course-fields">
                        <div className="course-col">
                            <h5 className="form-label">Description</h5>
                            <input
                                type="text"
                                className="edit-course-description form-input"
                                value={editedCourseDescription}
                                onChange={handleCourseDescriptionChange}
                            />
                        </div>
                        <div className="course-col">
                            <h5 className="form-label">Type</h5>
                            <select className="form-select edit-type"
                                    value={editedType}
                                    onChange={handleTypeChange}>
                                {educationTypes.map((type, index) => (
                                    <option key={index + 1} value={type}>{capitalizeFirstLetter(type)}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="course-edit-contents">
                        <div className="course-col">
                            <h5 className="form-label">From:</h5>
                            {editedFromMonth && (
                                <select className="form-select edit-month"
                                        value={editedFromMonth}
                                        onChange={handleFromMonthChange}>
                                    {monthNames.map((month, index) => (
                                        <option key={index} value={month}>{month}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                        <div className="course-col">
                            <h5 className="form-label">&nbsp;</h5>
                            {editedFromYear && (
                                <SelectYear defaultValue={editedFromYear}
                                            onChange={handleFromYearChange}>
                                </SelectYear>)}
                        </div>
                        <div className="course-col">
                            <h5 className="form-label">To:</h5>
                            {editedToMonth && (
                                <select className="form-select edit-month"
                                        value={editedToMonth}
                                        onChange={handleToMonthChange}>
                                    {monthNames.map((month, index) => (
                                        <option key={index} value={month}>{month}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                        <div className="course-col">
                            <h5 className="form-label">&nbsp;</h5>
                            {editedToYear && (
                                <SelectYear defaultValue={editedToYear}
                                            onChange={handleToYearChange}>
                                </SelectYear>)}
                        </div>
                        <div className="course-col">
                            <h5 className="form-label">or  Current?</h5>
                            <input type="checkbox"
                                   className="course-current"
                                   checked={editedCurrent}
                                   onChange={handleCurrentChange}
                            />
                        </div>
                        <div className="course-edit-icons">
                            <FiCheckCircle className="icon-xlarge save-icon" onClick={handleCourseSaveClick} />
                            <MdOutlineCancel className="icon-xlarge cancel-icon" onClick={handleCourseCancelClick} />
                        </div>
                    </div>
                </div>
            )}
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