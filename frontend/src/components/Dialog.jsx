import React from 'react';

const Dialog = ({ isOpen, type, heading, text, onCancel, onConfirm }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="custom-dialog">
            <div className="custom-dialog-content">
                <h2>{heading}</h2>
                <p>{type} - {text}</p>
                <div className="custom-dialog-footer">
                        <button type="submit"
                              className="formbutton focused"
                              id="submitBtn"
                              onClick={onConfirm}>Ok</button>
                        <button type="button"
                              className="formbutton"
                              id="cancelBtn"
                              onClick={onCancel}>Cancel</button>
                  </div>
            </div>
        </div>
    );
};

export default Dialog;