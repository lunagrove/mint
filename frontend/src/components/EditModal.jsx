import React from 'react';
import { useState, useEffect } from "react";
import { cardTypes, iconMap } from "../utilities/constants";
import EditProfile from './EditProfile';
import EditIntro from './EditIntro';
import EditSkills from './EditSkills';
import { IoMdClose } from "react-icons/io";
import { Auth, API } from "aws-amplify";

const EditModal = ({
    onClose,
    onSubmit,
    cardNumber,
    inputProfile,
    skills,
    intro }) => {

  const [profile, setProfile] = useState(inputProfile);
  const [skillCount, setSkillCount] = useState(0);
  const [introStatements, setIntroStatements] = useState([]);
  const [loadingStatements, setLoadingStatements] = intro ? useState(true) : useState(false);
  const [introCount, setIntroCount] = useState(0);

  const IconComponent = iconMap[cardNumber];

  useEffect(() => {
    if (skills) {
        setSkillCount(skills.length);
    }
  }, [skills]);

  useEffect(() => {
    if (intro) {
      fetchIntroStatements();
    }
  }, [intro]);

  useEffect(() => {
    if (introStatements) {
        setIntroCount(introStatements.length);
    }
  }, [introStatements]);

  const fetchIntroStatements = async () => {
    try {
      const session = await Auth.currentSession();
      const token = session.getAccessToken().getJwtToken();
      const response = await API.get("api", "/intro", {
        headers: {
          Authorization: `Bearer ${token}`  
        }
      });
      setIntroStatements(response.statements);
      setIntroCount(response.statements.length);
      setLoadingStatements(false);
    } catch (error) {
      console.log(error);
    }
  };

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
                  <>
                    <h3>Manage {cardTypes[cardNumber]}: Introduction</h3>
                    {!loadingStatements && <h3>&nbsp;({introCount})</h3>}
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
              <EditProfile profile={profile}
                           onSubmit={handleSubmit}
                           onClose={handleClose} />
        )}

        {cardNumber === 0 && intro && (
              <EditIntro statements={introStatements}
                         loadingIntro={loadingStatements}
                         onAdd={handleAddIntro}
                         onDelete={handleDeleteIntro}/>
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
