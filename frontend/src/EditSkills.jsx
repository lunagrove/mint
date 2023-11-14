import React from 'react';
import { useState } from "react";
import EditSkillRow from './EditSkillRow';

const EditSkills = ( {skills} ) => {

      const [description, setDescription] = useState("");

      const handleAddClick = () => {
            console.log('Add Skill button clicked!');      
        };

      return (
            <>
                  <div className="add-skill">
                        <form className="add-skill-form">
                              <h6 className="form-label">Skill description</h6>
                              <input type="text"
                                     id="description"
                                     className="form-input"
                                     name="description"
                                     value={description ? description : ""}
                                     onChange={(event) => setDescription(event.target.value)} />
                        </form>
                        <img
                              className="plus-button add-skill-button"
                              src="./plus-icon-80x80.png"
                              alt="Plus icon"
                              onClick={handleAddClick}
                        />  
                  </div>
                  <ul className="edit-skills-list">
                        {skills && skills.length > 0 ? (
                              skills.map((skill, index) =>
                                    <EditSkillRow key={index}
                                                skill={skill} />)
                              ) : (
                                    <h2>You have no skills saved. Try adding some skills!</h2>
                              )}
                        
                  </ul>
            </>
      );
};

export default EditSkills;