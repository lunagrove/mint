import React from 'react';
import { useState } from "react";

const AddCourse = ({ onSubmit, onClose }) => {

    const [description, setDescription] = useState('');

    const handleChange = (e) => {
        setDescription(e.target.value);       
    };

    const handleSubmit = () => {
        onSubmit(description);
        handleClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="course-panel-contents">
            <h2>Add Course or Credential</h2>
            <form className="add-course-form">
                <h5 className="form-label">Description</h5>
                <input type="text"
                        id="description"
                        className="form-input course-description"
                        name="description"
                        autoComplete="off"
                        onChange={(e) => handleChange(e)} />
            </form>
            <div className="course-panel-footer">
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

export default AddCourse;