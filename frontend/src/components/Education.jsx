import React from 'react';
import { PiArrowElbowDownRightFill } from "react-icons/pi";
import { formatMonthandYear } from "../utilities/dates";

const Education = ({ education }) => {

    return (
        <div className="education-block">
            <h3 className="education-institution">{education.institution}</h3>
            <div className="education-course">
                <PiArrowElbowDownRightFill className="icon-xlarge icon-margin-left" />
                {education.details.length > 0 && (education.details.map((item) =>
                    <div key={item.id} className="education-course-block">
                        <h3 className="education-course-name" >{item.description}</h3>
                        <p className="education-course-details">{formatMonthandYear(item.fromdate)}</p>
                        <p className="education-course-details">{formatMonthandYear(item.todate)}</p>
                    </div>)
                )}
            </div>
        </div>
    );
}

export default Education;