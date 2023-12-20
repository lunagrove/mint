import React from 'react';
import { useState } from "react";
import { PiArrowElbowDownRightFill } from "react-icons/pi";
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { formatMonthandYear } from "../utilities/dates";
import Dialog from './Dialog';

const Companies = ({ company, onDelete, onDeleteRole }) => {

    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setDeleteDialogOpen(false);
        onDelete(company.companyid);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
    };
    
    const handleEditClick = () => {
        
    };
    
    const handleDeleteRoleClick = (roleId) => {
        onDeleteRole(company.companyid, roleId);    
    };
    
    const handleEditRoleClick = () => {
            
    };

    return (
        <div className="company-row">
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
                                    <BsPencil className="icon-medium edit-icon" onClick={handleEditRoleClick}/>
                                    <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteRoleClick(item.id)}/>
                                </div>
                            </div>
                        </div>
                        )
                    )}
                </div>   
            </div>
            <div className="company-add-detail">
                <img
                    className="plus-button plus-button-small"
                    src="./plus-icon-80x80.png"
                    alt="Plus icon"
                />
                <h5>Add role</h5>
            </div>
            <Dialog
                isOpen={isDeleteDialogOpen}
                type="Warning"
                heading="Confirm Delete"
                text="Are you sure you want to delete this company? Deleting it will also delete any associated roles. If any experience snippets are tagged with these roles, those tags will be removed."
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}

export default Companies;