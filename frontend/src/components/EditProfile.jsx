import React from 'react';
import { useState } from "react";
import { useData } from '../utilities/DataContext';

const EditProfile = ( {onSubmit, onClose} ) => {

      const { userData, updateUserData } = useData();

      const [editedProfile, setEditedProfile] = useState(userData.profile);

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
                        <h5 className="form-label">Email</h5>
                        <input type="email"
                              id="email"
                              className="form-input"
                              name="emailaddress"
                              value={editedProfile.emailaddress}
                              readOnly />
                        <h5 className="form-label">First name</h5>
                        <input type="text"
                              id="firstname"
                              className="form-input"
                              name="firstname"
                              value={editedProfile.firstname ? editedProfile.firstname : ""}
                              onChange={handleChange} />
                        <h5 className="form-label">Last name</h5>
                        <input type="text"
                              id="lastname"
                              className="form-input"
                              name="lastname"
                              value={editedProfile.lastname ? editedProfile.lastname : ""}
                              onChange={handleChange} />
                        <h5 className="form-label">Phone number</h5>
                        <input type="text"
                              id="phonenumber"
                              className="form-input"
                              name="phonenumber"
                              autoComplete="off"
                              value={editedProfile.phonenumber ? editedProfile.phonenumber : ""}
                              onChange={handleChange} />
                        <h5 className="form-label">Location</h5>
                        <input type="text"
                              id="location"
                              className="form-input"
                              name="location"
                              autoComplete="off"
                              value={editedProfile.location ? editedProfile.location : ""}
                              onChange={handleChange} />
                        <h5 className="form-label">LinkedIn</h5>
                        <input type="text"
                              id="linkedin"
                              className="form-input"
                              name="linkedin"
                              autoComplete="off"
                              value={editedProfile.linkedin ? editedProfile.linkedin : ""}
                              onChange={handleChange} />
                        <h5 className="form-label">Website</h5>
                        <input type="text"
                              id="website"
                              className="form-input"
                              name="website"
                              autoComplete="off"
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
                              onClick={handleClose}>Go Back</button>
                  </div>
            </div>
      );
};

export default EditProfile;