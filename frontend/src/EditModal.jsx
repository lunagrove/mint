import React from 'react';
import { useState, useEffect } from "react";
import { cardTypes, iconMap } from "./utilities/constants";
import EditProfile from './EditProfile';
import EditIntro from './EditIntro';
import EditSkills from './EditSkills';
import { IoMdClose } from "react-icons/io";

const EditModal = ({ onClose, onSubmit, cardNumber, inputProfile, skills, intro }) => {

  const [profile, setProfile] = useState(inputProfile);
  const [skillCount, setSkillCount] = useState(0);

  const IconComponent = iconMap[cardNumber];

  useEffect(() => {
    if (skills) {
        setSkillCount(skills.length);
    }
  }, [skills]);

  const handleAdd = (numSkills) => {
    setSkillCount(numSkills);
  };

  const handleDelete = (numSkills) => {
    setSkillCount(numSkills);
  };

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (updatedProfile) => {
    setProfile(updatedProfile);
    onSubmit(updatedProfile);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-heading">
            {IconComponent && <IconComponent className="icon-large icon-margin-right" />}
            {cardNumber === 0 ? (
                intro ? (
                  <h3>Manage {cardTypes[cardNumber]}: Introduction</h3>
                ) : (
                  <h3>Manage {cardTypes[cardNumber]}</h3>
                ) 
            ) : (
                <>
                  <h3>Manage {cardTypes[cardNumber]}</h3>
                  {cardNumber === 5 && (
                    <h3>&nbsp;({skillCount})</h3>
                  )}
                </>
            )}
            <IoMdClose className="icon-large close-icon" onClick={onClose}/>
        </div>
        
        {cardNumber === 0 && !intro && (
              <EditProfile profile={profile}
                           onSubmit={handleSubmit}
                           onClose={handleClose} />
        )}

        {cardNumber === 0 && intro && (
              <EditIntro />
        )}
        
        {cardNumber === 5 && (
            <div className="modal-content">
                <EditSkills skills={skills}
                            onAdd={handleAdd}
                            onDelete={handleDelete} />
            </div>
        )}

        {cardNumber === 0 && intro && (
          <div className="modal-footer">
            <button type="button"
                      className="modal-button"
                      id="cancelBtn"
                      onClick={handleClose}>Close</button>
            </div>
          )}  

        {cardNumber === 5 && (
          <div className="modal-footer">
            <button type="button"
                      className="modal-button"
                      id="cancelBtn"
                      onClick={handleClose}>Close</button>
            </div>
          )}            
        
      </div>
    </div>
  );
};

export default EditModal;
