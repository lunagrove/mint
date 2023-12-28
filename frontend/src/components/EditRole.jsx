import React from 'react';
import { useState, useEffect } from "react";
import { monthNames } from "../utilities/constants";
import { formatMonthandYear, formatFirstOfMonthDate } from "../utilities/dates";
import SelectYear from "./SelectYear";
import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";

const EditRole = ({ companyId, role, onSave, onCancel }) => {

    const [editedDescription, setEditedDescription] = useState('');
    const [editedFromMonth, setEditedFromMonth] = useState('');
    const [editedFromYear, setEditedFromYear] = useState('');
    const [editedToMonth, setEditedToMonth] = useState('');
    const [editedToYear, setEditedToYear] = useState('');
    const [editedCurrent, setEditedCurrent] = useState(false);

    useEffect(() => {
        if (role) {
            setEditedDescription(role.description);
            var roleFromDate = formatMonthandYear(role.fromdate);
            var parts = roleFromDate.split(' ');
            setEditedFromMonth(parts[0]);
            setEditedFromYear(parts[1]);
            var roleToDate = formatMonthandYear(role.todate);
            parts = roleToDate.split(' ');
            setEditedToMonth(parts[0]);      
            setEditedToYear(parts[1]);
            setEditedCurrent(role.current);
        }
    }, [role]);

    const handleSaveClick = () => {
        const editedFromDate = formatFirstOfMonthDate(editedFromYear, editedFromMonth);
        const editedToDate = formatFirstOfMonthDate(editedToYear, editedToMonth);
        onSave(companyId, role.id, editedDescription, editedFromDate, editedToDate, editedCurrent);
    };

    const handleCancelClick = () => {
        onCancel();
    };

    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.value);
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

    return (
        <>
            <h5 className="form-label">Description</h5>
            <input
                type="text"
                className="edit-role-description form-input"
                value={editedDescription}
                onChange={handleDescriptionChange}
            />
            <div className="role-edit-contents">
                <div className="role-col">
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
                <div className="role-col">
                    <h5 className="form-label">&nbsp;</h5>
                    {editedFromYear && (
                        <SelectYear defaultValue={editedFromYear}
                                    onChange={handleFromYearChange}>
                        </SelectYear>
                    )}
                </div>
                <div className="role-col">
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
                <div className="role-col">
                    <h5 className="form-label">&nbsp;</h5>
                    {editedToYear && (
                        <SelectYear defaultValue={editedToYear}
                                    onChange={handleToYearChange}>
                        </SelectYear>
                    )}
                </div>
                <div className="role-col">
                    <h5 className="form-label">or  Current?</h5>
                    <input type="checkbox"
                            className="role-current"
                            checked={editedCurrent}
                            onChange={handleCurrentChange}
                    />
                </div>
                <div className="role-edit-icons">
                    <FiCheckCircle className="icon-xlarge save-icon" onClick={handleSaveClick} />
                    <MdOutlineCancel className="icon-xlarge cancel-icon" onClick={handleCancelClick} />
                </div>
            </div>
        </>
    );
}

export default EditRole;