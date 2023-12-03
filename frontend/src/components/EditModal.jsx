import React from 'react';
import { useState, useEffect } from "react";
import { cardTypes, iconMap } from "../utilities/constants";
import EditProfile from './EditProfile';
import EditIntro from './EditIntro';
import EditSkills from './EditSkills';
import { IoMdClose } from "react-icons/io";
import { useData } from '../utilities/DataContext';

const EditModal = ({
    onClose,
    onSubmit,
    cardNumber,
    intro }) => {

  const { userData, updateUserData } = useData();

  const [skillCount, setSkillCount] = useState(0);
  const [introCount, setIntroCount] = useState(0);

  const IconComponent = iconMap[cardNumber];

  useEffect(() => {
    if (userData.skills) {
        setSkillCount(userData.skills.length);
    }
  }, [userData.skills]);

  useEffect(() => {
    if (userData.intro) {
        setIntroCount(userData.intro.length);
    }
  }, [userData.intro]);

  const handleAdd = (numSkills) => {
    setSkillCount(numSkills);
  };

  const handleDelete = (numSkills) => {
    setSkillCount(numSkills);
  };

  const handleAddIntro = (numStatements) => {
    setIntroCount(numStatements);
  };

  const handleDeleteIntro = (numStatements) => {
    setIntroCount(numStatements);
  };

  const handleClose = () => {
      onClose();
  };

  const handleSubmit = (updatedProfile) => {
    onSubmit(updatedProfile);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-heading">
            {IconComponent && <IconComponent className="icon-large icon-margin-right" />}
              {cardNumber === 0 ? (
                intro ? (
                  <>
                    <h3>Manage {cardTypes[cardNumber]}: Introduction</h3>
                    <h3>&nbsp;({introCount})</h3>
                  </>
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
              <EditProfile onSubmit={handleSubmit}
                           onClose={handleClose} />
        )}

        {cardNumber === 0 && intro && (
              <EditIntro onAdd={handleAddIntro}
                         onDelete={handleDeleteIntro}/>
        )}
        
        {cardNumber === 5 && (
            <div className="modal-content">
                <EditSkills onAdd={handleAdd}
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
