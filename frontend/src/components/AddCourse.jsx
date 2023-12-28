import React from 'react';
import { useState, useEffect } from "react";
import { monthNames, educationTypes } from "../utilities/constants";
import { formatMonthandYear, formatFirstOfMonthDate, formatShortDate } from "../utilities/dates";
import SelectYear from "./SelectYear";

const AddCourse = ({ educationId, onSubmit, onClose }) => {

    const [description, setDescription] = useState('');
    const [courseType, setCourseType] = useState('course');
    const [fromMonth, setFromMonth] = useState('');
    const [fromYear, setFromYear] = useState('');
    const [toMonth, setToMonth] = useState('');
    const [toYear, setToYear] = useState('');
    const [current, setCurrent] = useState(false);

    useEffect(() => {
        const today = new Date();
        const dateStr = formatShortDate(today);
        var roleDate = formatMonthandYear(dateStr);
        var parts = roleDate.split(' ');
        setFromMonth(parts[0]);
        setFromYear(parts[1]);
        setToMonth(parts[0]);      
        setToYear(parts[1]);
    }, []);

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleTypeChange = (e) => {
        setCourseType(e.target.value);
    };

    const handleFromMonthChange = (e) => {
        setFromMonth(e.target.value);
    };

    const handleFromYearChange = (newValue) => {
        setFromYear(newValue);
    };

    const handleToMonthChange = (e) => {
        setToMonth(e.target.value);
    };

    const handleToYearChange = (newValue) => {
        setToYear(newValue);
    };

    const handleCurrentChange = (e) => {
        setCurrent(e.target.checked);
    };

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleSubmit = () => {
        const newFromDate = formatFirstOfMonthDate(fromYear, fromMonth);
        const newToDate = formatFirstOfMonthDate(toYear, toMonth);
        onSubmit(educationId, description, courseType, newFromDate, newToDate, current);
        handleClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="course-panel-contents">
            <h2>Add Course or Credential</h2>
            <div className="add-course-form">
                <div className="add-course-fields">
                    <div className="course-col">
                        <h5 className="form-label">Description</h5>
                        <input type="text"
                                id="description"
                                className="form-input course-description"
                                name="description"
                                autoComplete="off"
                                onChange={(e) => handleDescriptionChange(e)} />
                    </div>
                    <div className="course-col">
                        <h5 className="form-label">Type</h5>
                        <select className="form-select edit-type"
                                value={courseType}
                                onChange={handleTypeChange}>
                            {educationTypes.map((type, index) => (
                                <option key={index + 1} value={type}>{capitalizeFirstLetter(type)}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="course-add-contents">
                    <div className="course-col">
                        <h5 className="form-label">From:</h5>
                        {fromMonth && (
                            <select className="form-select edit-month"
                                    value={fromMonth}
                                    onChange={handleFromMonthChange}>
                                {monthNames.map((month, index) => (
                                    <option key={index} value={month}>{month}</option>
                                ))}
                            </select>
                        )}
                    </div>
                    <div className="course-col">
                        <h5 className="form-label">&nbsp;</h5>
                        {fromYear && (
                            <SelectYear defaultValue={fromYear}
                                        onChange={handleFromYearChange}>
                            </SelectYear>)}
                    </div>
                    <div className="course-col">
                        <h5 className="form-label">To:</h5>
                        {toMonth && (
                            <select className="form-select edit-month"
                                    value={toMonth}
                                    onChange={handleToMonthChange}>
                                {monthNames.map((month, index) => (
                                    <option key={index} value={month}>{month}</option>
                                ))}
                            </select>
                        )}
                    </div>
                    <div className="course-col">
                        <h5 className="form-label">&nbsp;</h5>
                        {toYear && (
                            <SelectYear defaultValue={toYear}
                                        onChange={handleToYearChange}>
                            </SelectYear>)}
                    </div>
                    <div className="course-col">
                        <h5 className="form-label">or  Current?</h5>
                        <input type="checkbox"
                                className="course-current"
                                checked={current}
                                onChange={handleCurrentChange}
                        />
                    </div>
                </div>
            </div>
            <div className="course-panel-footer">
                <button type="button"
                        className="formbutton focused"
                        id="submitBtn"
                        onClick={handleSubmit}>Save</button>
                <button type="button"
                        className="formbutton"
                        id="cancelBtn"
                        onClick={handleClose}>Close</button>
            </div>
        </div>
    );
}

export default AddCourse;