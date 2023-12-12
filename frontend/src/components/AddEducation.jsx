import React from 'react';
import { useState } from "react";

const AddEducation = ({ onSubmit, onClose }) => {

    const [institution, setInstitution] = useState('');
    const [location, setLocation] = useState('');

    const handleChange = (e, type) => {
        if (type === 1) {
            setInstitution(e.target.value);    
        }
        if (type === 2) {
            setLocation(e.target.value);    
        }    
    };

    const handleSubmit = () => {
        onSubmit(institution, location);
        handleClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="education-panel-contents">
            <form className="add-institution-form">
                <h5 className="form-label">Institution name</h5>
                <input type="text"
                        id="institution"
                        className="form-input"
                        name="institution"
                        onChange={(e) => handleChange(e, 1)} />
                <h5 className="form-label">Location</h5>
                <input type="text"
                        id="location"
                        className="form-input"
                        name="location"
                        autoComplete="off"
                        onChange={(e) => handleChange(e, 2)} />
            </form>
            <div className="education-panel-footer">
                <button type="submit"
                        className="formbutton focused"
                        id="submitBtn"
                        onClick={handleSubmit}>Save</button>
                <button type="button"
                        className="formbutton"
                        id="cancelBtn"
                        onClick={handleClose}>Close</button>
            </div>
        </div>
    );
}

export default AddEducation;