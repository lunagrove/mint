import React from 'react';
import { useState } from "react";

const AddSnippet = ({ onSubmit, onClose }) => {

    const [snippet, setSnippet] = useState('');

    const handleChange = (e) => {
        setSnippet(e.target.value);    
    };

    const handleSubmit = () => {
        onSubmit(snippet);
        handleClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="panel-contents">
            <form className="add-hobby-form">
                <h5 className="form-label">Snippet description</h5>
                <textarea className="form-textarea"
                          id="snippet" 
                          name="snippet"
                          rows="6"
                          cols="50"
                          onChange={(e) => handleChange(e)}>
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

export default AddSnippet;