import React from 'react';
import { PiArrowElbowDownRightFill } from "react-icons/pi";
import { IoTrashOutline } from "react-icons/io5";
import { BsPencil } from "react-icons/bs";
import { formatMonthandYear } from "../utilities/dates";

const Companies = ({ company }) => {

    const handleDeleteClick = () => {
    
    };
    
    const handleEditClick = () => {
        
    };
    
    const handleDeleteRoleClick = () => {
        
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
                                    <IoTrashOutline className="icon-medium edit-icon" onClick={handleDeleteRoleClick}/>
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
        </div>
    );
}

export default Companies;