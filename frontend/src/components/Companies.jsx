import React from 'react';
import { useState } from "react";
import { PiArrowElbowDownRightFill } from "react-icons/pi";
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { formatMonthandYear } from "../utilities/dates";
import AddRole from "../components/AddRole";
import EditRole from "../components/EditRole";
import Dialog from "./Dialog";

const Companies = ({ company, onDelete, onDeleteRole, onEdit, onEditRole, onAddRole }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(company.description);
    const [editedName, setEditedName] = useState(company.companyName);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isDeleteRoleDialogOpen, setDeleteRoleDialogOpen] = useState(false);
    const [roleIdToDelete, setRoleIdToDelete] = useState(null);
    const [isEditingRole, setIsEditingRole] = useState(false);
    const [roleToEdit, setRoleToEdit] = useState(null);
    const [isAddingRole, setIsAddingRole] = useState(false);
    
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

    const handleSave = (roleId, description, fromDate, toDate, current) => {
        setIsEditingRole(false);
        onEditRole(company.companyId, roleId, description, fromDate, toDate, current);
    };

    const handleCancel = () => {
        setIsEditingRole(false);
    };  

    const handleAddRoleClick = () => {
        setIsAddingRole(true);
    };

    const handleSubmit = (description, fromDate, toDate, current) => {
        setIsAddingRole(false);
        onAddRole(company.companyId, description, fromDate, toDate, current);
    };

    const handleClose = () => {
        setIsAddingRole(false);
    };

    return (
        <div className={`company-row ${isEditing || isEditingRole ? 'editing' : isAddingRole ? 'adding' : ''}`}>
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
                <div className={`company-overlay ${isEditingRole ? 'show' : 'hide'}`}></div>)}
            {isEditingRole && (
                <div className={`role-edit-block ${isEditingRole ? 'show' : 'hide'}`}>
                    <EditRole role={roleToEdit}
                              onSave={handleSave}
                              onCancel={handleCancel} />    
                </div>
            )}
            <div className="company-add-detail">
                <img
                    className="plus-button plus-button-small"
                    src="./plus-icon-80x80.png"
                    alt="Plus icon"
                    onClick={handleAddRoleClick}
                />
                <h5>Add role</h5>
            </div>
            {isAddingRole && (
                <div className={`company-overlay ${isAddingRole ? 'show' : 'hide'}`}></div>)}
            {isAddingRole && (                  
                <div className={`role-add-block ${isAddingRole ? 'show' : 'hide'}`}>
                    <AddRole onSubmit={handleSubmit}
                             onClose={handleClose} />
                </div>  
            )}
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