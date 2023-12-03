import React from 'react';
import { PiArrowElbowDownRightFill } from "react-icons/pi";
import { formatMonthandYear } from "../utilities/dates";

const Education = ({ education }) => {

    return (
        <div className="page-row">
            <div className="page-info-block">
                <h3 className="page-info-heading">
                    {education.institution}
                    {education.location && `, ${education.location}`}</h3>
                <div className="page-info-detail">
                    
                    {education.details.length > 0 && (education.details.map((item) =>
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
                <h5>Add course or credential</h5>
            </div>
        </div>
    );
}

export default Education;