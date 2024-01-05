import { useState, useEffect } from "react";
import IconButton from "../components/IconButton";

const ResumePage = () => {

    

    

    return (
        <>
            <div className="resume-document">
                <div className="resume-page">
                    
                </div>
            </div>
            <div className="resume-buttons">
                <IconButton iconType="document"
                            caption="Build Resume"
                            linkTo="/resume"
                            size="wide" />
                <IconButton iconType="back"
                            caption="Dashboard"
                            linkTo="/"
                            size="normal" />
            </div>
        </>
    );
}

export default ResumePage;