import React from 'react';
import { useState } from "react";

const EditProfile = ( {profile, onSubmit, onClose} ) => {

    const [editedProfile, setEditedProfile] = useState(profile);

    const handleChange = (e) => {
      setEditedProfile((prevProfile) => ({
            ...prevProfile,
            [e.target.name]: e.target.value,
      }));
    };
  
    const handleSubmit = () => {
      onSubmit(editedProfile);
      handleClose();
    };

    const handleClose = () => {
      onClose();
    };

    return (
      <div className="modal-content">
            <form>
                  <h6 className="form-label">Email</h6>
                  <input type="email"
                        id="email"
                        className="form-input"
                        name="emailaddress"
                        value={editedProfile.emailaddress}
                        readOnly />
                  <h6 className="form-label">First name</h6>
                  <input type="text"
                        id="firstname"
                        className="form-input"
                        name="firstname"
                        value={editedProfile.firstname ? editedProfile.firstname : ""}
                        onChange={handleChange} />
                  <h6 className="form-label">Last name</h6>
                  <input type="text"
                        id="lastname"
                        className="form-input"
                        name="lastname"
                        value={editedProfile.lastname ? editedProfile.lastname : ""}
                        onChange={handleChange} />
                  <h6 className="form-label">Phone number</h6>
                  <input type="text"
                        id="phonenumber"
                        className="form-input"
                        name="phonenumber"
                        value={editedProfile.phonenumber ? editedProfile.phonenumber : ""}
                        onChange={handleChange} />
                  <h6 className="form-label">Location</h6>
                  <input type="text"
                        id="location"
                        className="form-input"
                        name="location"
                        value={editedProfile.location ? editedProfile.location : ""}
                        onChange={handleChange} />
                  <h6 className="form-label">LinkedIn</h6>
                  <input type="text"
                        id="linkedin"
                        className="form-input"
                        name="linkedin"
                        value={editedProfile.linkedin ? editedProfile.linkedin : ""}
                        onChange={handleChange} />
                  <h6 className="form-label">Website</h6>
                  <input type="text"
                        id="website"
                        className="form-input"
                        name="website"
                        value={editedProfile.website ? editedProfile.website : ""}
                        onChange={handleChange} />
            </form>
            <div className="modal-footer">
                  <button type="submit"
                          className="formbutton focused"
                          id="submitBtn"
                          onClick={handleSubmit}>Save</button>
                  <button type="button"
                          className="formbutton"
                          id="cancelBtn"
                          onClick={handleClose}>Cancel</button>
            </div>
        </div>
    );
};

export default EditProfile;