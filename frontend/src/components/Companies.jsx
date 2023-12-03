import React from 'react';
import { PiArrowElbowDownRightFill } from "react-icons/pi";
import { formatMonthandYear } from "../utilities/dates";

const Companies = ({ company }) => {

    return (
        <div className="page-row">
            <div className="page-info-block">
                <h3 className="page-info-heading">
                    {company.companyName}</h3>
                <h4>{company.description}</h4>
                <div className="page-info-detail">
                    
                    {company.details.length > 0 && (company.details.map((item) =>
                        <div key={item.id} className="page-detail-block">
                            <PiArrowElbowDownRightFill className="icon-xlarge icon-margin-left" />
                            <div className="page-info-details">
                                <h3 className="page-info-description" >{item.description}</h3>
                                <p className="page-info-dates">From: {formatMonthandYear(item.fromdate)}</p>
                                {item.current ? <p>To: Current</p>
                                              : <p className="page-info-dates">To: {formatMonthandYear(item.todate)}</p>}
                            </div>
                        </div>
                        )
                    )}
                </div>   
                
            </div>
            <div className="page-add-detail">
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