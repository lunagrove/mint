import React from 'react';
import { useState } from "react";

const AddCompany = ({ onSubmit, onClose }) => {

    const [companyName, setCompanyName] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (e, type) => {
        if (type === 1) {
            setCompanyName(e.target.value);    
        }
        if (type === 2) {
            setDescription(e.target.value);    
        }    
    };

    const handleSubmit = () => {
        onSubmit(companyName, description);
        handleClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="panel-contents">
            <form className="add-company-form">
                <h5 className="form-label">Company name</h5>
                <input type="text"
                        id="companyname"
                        className="form-input"
                        name="companyname"
                        onChange={(e) => handleChange(e, 1)} />
                <h5 className="form-label">Description</h5>
                <input type="text"
                        id="description"
                        className="form-input"
                        name="description"
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

export default AddCompany;