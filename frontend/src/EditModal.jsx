import React from 'react';
import { cardTypes, iconMap } from "./utilities/constants";

const EditModal = ({ onClose, cardNumber }) => {

const IconComponent = iconMap[cardNumber];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-form">
            <div className="modal-heading">
                {IconComponent && <IconComponent className="icon-large icon-margin-right" />}
                {cardNumber === 0 ? (
                    <h3>Edit {cardTypes[cardNumber]}</h3>
                ) : (
                    <h3>Manage {cardTypes[cardNumber]}</h3>
                )}
            </div>
            <div className="modal-body">

                
            </div>
        </div>
        <div className="modal-footer">
            <button type="submit"
                className="modal-button focused"
                id="submitBtn">Submit</button>
            <button type="button"
                className="modal-button"
                id="cancelBtn"
                onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
