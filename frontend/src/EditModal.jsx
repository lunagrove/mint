import React from 'react';
import { cardTypes, iconMap } from "./utilities/constants";
import EditProfile from './EditProfile';
import EditSkills from './EditSkills';
import { IoMdClose } from "react-icons/io";

const EditModal = ({ onClose, cardNumber, profile, skills }) => {

  const IconComponent = iconMap[cardNumber];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-heading">
            {IconComponent && <IconComponent className="icon-large icon-margin-right" />}
            {cardNumber === 0 ? (
                <h3>Edit {cardTypes[cardNumber]}</h3>
            ) : (
                <h3>Manage {cardTypes[cardNumber]}</h3>
            )}
            <IoMdClose className="icon-large close-icon" onClick={onClose}/>
        </div>
        <div className="modal-content">
          {cardNumber === 0 && (
                <EditProfile profile={profile} />
          
          )}
          {cardNumber === 5 && (
                <EditSkills skills={skills} />
          
          )}
        </div>
        <div className="modal-footer">
            {cardNumber === 5 &&
                (<button type="button"
                         className="modal-button"
                         id="cancelBtn"
                         onClick={onClose}>Close</button>
                )
            }
            {cardNumber === 0 && (
              <>
                <button type="submit"
                        className="formbutton focused"
                        id="submitBtn"
                        onClick={onClose}>Save</button>
                <button type="button"
                        className="formbutton"
                        id="cancelBtn"
                        onClick={onClose}>Cancel</button>
              </>
              )
            }
        </div>
      </div>
    </div>
  );
};

export default EditModal;
