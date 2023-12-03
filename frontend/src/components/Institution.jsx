import React from 'react';

const Institution = ({ onSubmit, onClose }) => {

    const handleChange = (e) => {
        
    };

    const handleSubmit = () => {
//        onSubmit(editedProfile);
        onSubmit();
        handleClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="add-institution-panel">
            <div className="add-institution-container">
                <form className="add-institution-form">
                    <h6 className="form-label">Institution name</h6>
                    <input type="text"
                            id="institution"
                            className="form-input"
                            name="institution"
    //                        value={editedProfile.lastname ? editedProfile.lastname : ""}
                            onChange={handleChange} />
                    <h6 className="form-label">Location</h6>
                    <input type="text"
                            id="location"
                            className="form-input"
                            name="location"
                            autoComplete="off"
    //                        value={editedProfile.phonenumber ? editedProfile.phonenumber : ""}
                            onChange={handleChange} />
                </form>
                <div className="panel-footer">
                    <button type="submit"
                            className="formbutton focused"
                            id="submitBtn"
                            onClick={handleSubmit}>Save</button>
                    <button type="button"
                            className="formbutton"
                            id="cancelBtn"
                            onClick={handleClose}>Go Back</button>
                </div>
            </div>
        </div>
    );
}

export default Institution;