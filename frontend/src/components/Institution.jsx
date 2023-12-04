import React from 'react';
import { useState } from "react";

const Institution = ({ onSubmit, onClose }) => {

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
        <div className="panel-contents">
            <form className="add-institution-form">
                <h6 className="form-label">Institution name</h6>
                <input type="text"
                        id="institution"
                        className="form-input"
                        name="institution"
                        onChange={(e) => handleChange(e, 1)} />
                <h6 className="form-label">Location</h6>
                <input type="text"
                        id="location"
                        className="form-input"
                        name="location"
                        autoComplete="off"
                        onChange={(e) => handleChange(e, 2)} />
            </form>
            <div className="panel-footer">
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

export default Institution;