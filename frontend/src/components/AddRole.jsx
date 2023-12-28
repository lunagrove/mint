import React from 'react';
import { useState, useEffect } from "react";
import { monthNames } from "../utilities/constants";
import { formatMonthandYear, formatFirstOfMonthDate, formatShortDate } from "../utilities/dates";
import SelectYear from "./SelectYear";

const AddRole = ({ companyId, onSubmit, onClose }) => {

    const [description, setDescription] = useState('');
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

    const handleSubmit = () => {
        const newFromDate = formatFirstOfMonthDate(fromYear, fromMonth);
        const newToDate = formatFirstOfMonthDate(toYear, toMonth);
        onSubmit(companyId, description, newFromDate, newToDate, current);
        handleClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="role-panel-contents">
            <h2>Add Role</h2>
            <div className="add-role-form">
                <h5 className="form-label">Description</h5>
                <input type="text"
                        id="description"
                        className="form-input role-description"
                        name="description"
                        autoComplete="off"
                        onChange={(e) => handleDescriptionChange(e)} />
                <div className="role-edit-contents">
                    <div className="role-col">
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
                    <div className="role-col">
                        <h5 className="form-label">&nbsp;</h5>
                        {fromYear && (
                            <SelectYear defaultValue={fromYear}
                                        onChange={handleFromYearChange}>
                            </SelectYear>
                        )}
                    </div>
                    <div className="role-col">
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
                    <div className="role-col">
                        <h5 className="form-label">&nbsp;</h5>
                        {toYear && (
                            <SelectYear defaultValue={toYear}
                                        onChange={handleToYearChange}>
                            </SelectYear>
                        )}
                    </div>
                    <div className="role-col">
                        <h5 className="form-label">or  Current?</h5>
                        <input type="checkbox"
                                className="role-current"
                                checked={current}
                                onChange={handleCurrentChange}
                        />
                    </div>
                </div>
            </div>
            <div className="role-panel-footer">
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

export default AddRole;