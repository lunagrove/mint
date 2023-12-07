import React from 'react';
import { useState } from "react";

const AddHobby = ({ onSubmit, onClose }) => {

    const [description, setDescription] = useState('');
    const [snippet, setSnippet] = useState('');

    const handleChange = (e, type) => {
        if (type === 1) {
            setDescription(e.target.value);    
        }
        if (type === 2) {
            setSnippet(e.target.value);    
        }    
    };

    const handleSubmit = () => {
        onSubmit(description, snippet);
        handleClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="panel-contents">
            <form className="add-hobby-form">
                <h5 className="form-label">Hobby name</h5>
                <input type="text"
                        id="hobbyname"
                        className="form-input"
                        name="hobbyname"
                        onChange={(e) => handleChange(e, 1)} />
                <h5 className="form-label">Description</h5>
                <textarea className="form-textarea"
                          id="snippet" 
                          name="snippet"
                          rows="4"
                          cols="50"
                          onChange={(e) => handleChange(e, 2)}>
                </textarea>
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

export default AddHobby;