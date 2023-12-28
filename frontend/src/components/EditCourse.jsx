import React from 'react';
import { useState, useEffect } from "react";
import { monthNames, educationTypes } from "../utilities/constants";
import { formatMonthandYear, formatFirstOfMonthDate } from "../utilities/dates";
import SelectYear from "./SelectYear";
import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";

const EditCourse = ({ educationId, course, onSave, onCancel }) => {

    const [editedDescription, setEditedDescription] = useState('');
    const [editedType, setEditedType] = useState('course');
    const [editedFromMonth, setEditedFromMonth] = useState('');
    const [editedFromYear, setEditedFromYear] = useState('');
    const [editedToMonth, setEditedToMonth] = useState('');
    const [editedToYear, setEditedToYear] = useState('');
    const [editedCurrent, setEditedCurrent] = useState(false);

    useEffect(() => {
        if (course) {
            setEditedDescription(course.description);
            setEditedType(course.type);
            var courseFromDate = formatMonthandYear(course.fromdate);
            var parts = courseFromDate.split(' ');
            setEditedFromMonth(parts[0]);
            setEditedFromYear(parts[1]);
            var courseToDate = formatMonthandYear(course.todate);
            parts = courseToDate.split(' ');
            setEditedToMonth(parts[0]);      
            setEditedToYear(parts[1]);
            setEditedCurrent(course.current);
        }
    }, [course]);

    const handleSaveClick = () => {
        const editedFromDate = formatFirstOfMonthDate(editedFromYear, editedFromMonth);
        const editedToDate = formatFirstOfMonthDate(editedToYear, editedToMonth);
        onSave(educationId, course.id, editedDescription, editedType, editedFromDate, editedToDate, editedCurrent);
    };

    const handleCancelClick = () => {
        onCancel();
    };

    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.value);
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
        <>
            <div className="edit-course-fields">
                <div className="course-col">
                    <h5 className="form-label">Description</h5>
                    <input
                        type="text"
                        className="edit-course-description form-input"
                        value={editedDescription}
                        onChange={handleDescriptionChange}
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
                    <FiCheckCircle className="icon-xlarge save-icon" onClick={handleSaveClick} />
                    <MdOutlineCancel className="icon-xlarge cancel-icon" onClick={handleCancelClick} />
                </div>
            </div>  
        </>
    );
}

export default EditCourse;