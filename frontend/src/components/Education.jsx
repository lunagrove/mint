import React from 'react';
import { PiArrowElbowDownRightFill } from "react-icons/pi";
import { formatMonthandYear } from "../utilities/dates";

const Education = ({ education }) => {

    return (
        <div className="education-row">
            <div className="education-block">
                <h3 className="education-institution">
                    {education.institution}
                    {education.location && `, ${education.location}`}</h3>
                <div className="education-course">
                    
                    {education.details.length > 0 && (education.details.map((item) =>
                        <div key={item.id} className="education-course-block">
                            <PiArrowElbowDownRightFill className="icon-xlarge icon-margin-left" />
                            <div className="education-course-details">
                                <h3 className="education-course-name" >{item.description}</h3>
                                <p className="education-course-dates">From: {formatMonthandYear(item.fromdate)}</p>
                                {item.current ? <p>To: Current</p>
                                              : <p className="education-course-dates">To: {formatMonthandYear(item.todate)}</p>}
                            </div>
                        </div>
                        )
                    )}
                </div>
            </div>
            <div className="education-add-course">
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