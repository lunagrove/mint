import React from 'react';
import { useState, useEffect } from "react";
import { PiArrowElbowDownRightFill } from "react-icons/pi";
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { formatMonthandYear, getMonthName } from "../utilities/dates";
import { monthNames } from "../utilities/constants";
import Dialog from "./Dialog";
import SelectYear from "./SelectYear";

const Companies = ({ company, onDelete, onDeleteRole, onEdit, onEditRole }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(company.description);
    const [editedName, setEditedName] = useState(company.companyName);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isDeleteRoleDialogOpen, setDeleteRoleDialogOpen] = useState(false);
    const [roleIdToDelete, setRoleIdToDelete] = useState(null);
    const [isEditingRole, setIsEditingRole] = useState(false);
    const [editedRoleDescription, setEditedRoleDescription] = useState('');
    const [editedFromMonth, setEditedFromMonth] = useState('');
    const [editedFromYear, setEditedFromYear] = useState('');
    const [editedToMonth, setEditedToMonth] = useState('');
    const [editedToYear, setEditedToYear] = useState('');
    const [editedCurrent, setEditedCurrent] = useState(false);
    const [roleToEdit, setRoleToEdit] = useState(null);
    
    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setDeleteDialogOpen(false);
        onDelete(company.companyId);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
    };
    
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onEdit(company.companyId, editedDescription, editedName);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedDescription(company.description);
        setEditedName(company.companyName);
    };

    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.value);
    };

    const handleNameChange = (e) => {
        setEditedName(e.target.value);
    };
    
    const handleDeleteRoleClick = (roleId) => {
        setDeleteRoleDialogOpen(true);
        setRoleIdToDelete(roleId);       
    };

    const handleConfirmDeleteRole = (roleId) => {
        setDeleteRoleDialogOpen(false);
        onDeleteRole(company.companyId, roleId); 
    };

    const handleCancelDeleteRole = () => {
        setDeleteRoleDialogOpen(false);
    };
    
    const handleEditRoleClick = (role) => {
        setIsEditingRole(true);
        setRoleToEdit(role);    
    };

    useEffect(() => {
        if (roleToEdit) {
            setEditedRoleDescription(roleToEdit.description);
            setEditedFromMonth(getMonthName(roleToEdit.fromdate));
            var roleFromDate = new Date(roleToEdit.fromdate);
            setEditedFromYear(roleFromDate.getFullYear());
            setEditedToMonth(getMonthName(roleToEdit.todate));
            var roleToDate = new Date(roleToEdit.todate);
            setEditedToYear(roleToDate.getFullYear());
            setEditedCurrent(roleToEdit.current);
        }
    }, [roleToEdit]);

    const handleRoleSaveClick = () => {
        onEditRole(company.companyId, roleToEdit.id, editedRoleDescription, editedFromDate, editedToDate, editedCurrent);
        setIsEditingRole(false);
    };

    const handleRoleCancelClick = () => {
        setIsEditingRole(false);
    };

    const handleRoleDescriptionChange = (e) => {
        setEditedRoleDescription(e.target.value);
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
        <div className={`company-row ${isEditing || isEditingRole ? 'editing' : ''}`}>
            <div className="company-info-block"> 
                <div className="company-info-header">
                    <div className="company-info-company">
                        <h3 className="company-info-heading">
                            {company.companyName}</h3>
                        <div className="company-edit-icons">
                            <BsPencil className="icon-medium edit-icon" onClick={handleEditClick}/>
                            <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteClick}/>
                        </div>
                    </div>
                    <h4>{company.description}</h4>
                </div>
                <div className="company-info-detail">
                    {company.details.length > 0 && (company.details.map((item) =>
                        <div key={item.id} className="education-detail-block">
                            <PiArrowElbowDownRightFill className="icon-xlarge icon-margin-left" />
                            <div className="company-info-details">                           
                                <h3 className="company-info-description" >{item.description}</h3>
                                <p className="company-info-dates">From: {formatMonthandYear(item.fromdate)}</p>
                                {item.current ? <p>To: Current</p>
                                              : <p className="company-info-dates">To: {formatMonthandYear(item.todate)}</p>}
                                <div className="company-row-edit-icons">
                                    <BsPencil className="icon-medium edit-icon" onClick={() => handleEditRoleClick(item)}/>
                                    <IoTrashOutline className="icon-medium edit-icon" onClick={() => handleDeleteRoleClick(item.id)}/>
                                </div>
                            </div>
                        </div>
                        )
                    )}
                </div>   
            </div>
            {isEditing && (
                <div className={`company-overlay ${isEditing ? 'show' : 'hide'}`}></div>)}
            {isEditing && (
                <div className={`company-edit-block ${isEditing ? 'show' : 'hide'}`}>
                    <h5 className="form-label">Company name</h5>
                    <input
                        type="text"
                        className="edit-company-name form-input"
                        value={editedName}
                        onChange={handleNameChange}
                    />
                    <h5 className="form-label">Description</h5>
                    <div className="company-edit-contents">
                        <input
                            type="text"
                            className="edit-company-description form-input"
                            value={editedDescription}
                            onChange={handleDescriptionChange}
                        />
                        <div className="company-edit-icons2">
                            <FiCheckCircle className="icon-xlarge save-icon" onClick={handleSaveClick} />
                            <MdOutlineCancel className="icon-xlarge cancel-icon" onClick={handleCancelClick} />
                        </div>
                    </div>
                </div>
            )}
            {isEditingRole && (
                <div className={`company-overlay ${isEditing ? 'show' : 'hide'}`}></div>)}
            {isEditingRole && (
                <div className={`role-edit-block ${isEditingRole ? 'show' : 'hide'}`}>
                    <h5 className="form-label">Description</h5>
                    <input
                        type="text"
                        className="edit-role-description form-input"
                        value={editedRoleDescription}
                        onChange={handleRoleDescriptionChange}
                    />
                    <div className="role-edit-contents">
                        <div className="role-col">
                            <h5 className="form-label">From:</h5>
                            <select className="form-select edit-month"
                                    value={editedFromMonth}
                                    onChange={handleFromMonthChange}>
                                <option value="" disabled>Select a month</option>
                                {monthNames.map((month, index) => (
                                    <option key={index + 1} value={month}>{month}</option>
                                ))}
                            </select>
                        </div>
                        <div className="role-col">
                            <h5 className="form-label">&nbsp;</h5>
                            <SelectYear defaultValue={editedFromYear}
                                        onChange={handleFromYearChange}>
                            </SelectYear>
                        </div>
                        <div className="role-col">
                            <h5 className="form-label">To:</h5>
                            <select className="form-select edit-month"
                                    value={editedToMonth}
                                    onChange={handleToMonthChange}>
                                <option value="" disabled>Select a month</option>
                                {monthNames.map((month, index) => (
                                    <option key={index + 1} value={month}>{month}</option>
                                ))}
                            </select>
                        </div>
                        <div className="role-col">
                            <h5 className="form-label">&nbsp;</h5>
                            <SelectYear defaultValue={editedToYear}
                                        onChange={handleToYearChange}>
                            </SelectYear>
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
                            <FiCheckCircle className="icon-xlarge save-icon" onClick={handleRoleSaveClick} />
                            <MdOutlineCancel className="icon-xlarge cancel-icon" onClick={handleRoleCancelClick} />
                        </div>
                    </div>
                </div>
            )}
            <div className="company-add-detail">
                <img
                    className="plus-button plus-button-small"
                    src="./plus-icon-80x80.png"
                    alt="Plus icon"
                />
                <h5>Add role</h5>
            </div>
            {isDeleteDialogOpen && (
                <Dialog
                    type="Warning"
                    heading="Confirm Delete Company"
                    text="Are you sure you want to delete this company? Deleting it will also delete any associated roles. If any experience snippets are tagged with these roles, those tags will be removed."
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                />
            )}
            {isDeleteRoleDialogOpen && (
                <Dialog
                    type="Warning"
                    heading="Confirm Delete Role"
                    text="Are you sure you want to delete this role? If any experience snippets are tagged with this role, those tags will be removed."
                    onCancel={handleCancelDeleteRole}
                    onConfirm={() => handleConfirmDeleteRole(roleIdToDelete)}
                />
            )}
        </div>
    );
}

export default Companies;