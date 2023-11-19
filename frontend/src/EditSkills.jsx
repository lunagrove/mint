import React from 'react';
import { useState, useEffect } from "react";
import EditSkillRow from './EditSkillRow';
import { Auth, API } from "aws-amplify";
import { BsSearch } from "react-icons/bs";

const EditSkills = ( {skills, onAdd, onDelete} ) => {

      const [currentSkills, setCurrentSkills] = useState(skills);
      const [numSkills, setNumSkills] = useState(skills.length);
      const [search, setSearch] = useState("");
      const [filteredSkills, setFilteredSkills] = useState(skills);

      useEffect(() => {
            const newList = currentSkills.filter(
                              (item) => item.description.toLowerCase().indexOf(search.toLowerCase()) >= 0
            );
            setFilteredSkills(newList);
      }, [currentSkills, search]);

      const handleInputChange = (event) => {
            setSearch(event.target.value); 
      };

      const handleAddClick = async () => {
            console.log('Add Skill button clicked!');
            if (search !== "") {
                  try {
                        const result = await API.post("api", "/skill", {
                              headers: {
                                    Authorization: `Bearer ${(await Auth.currentSession())
                                    .getAccessToken()
                                    .getJwtToken()}`,
                              },
                              body: {description: search}
                        })
                        if (result) {
                              const newSkill = result.skill;
                              setCurrentSkills(prevSkills => [newSkill, ...prevSkills]);
                              setSearch("");
                              setNumSkills(prevNumSkills => {
                                    const updatedNumSkills = prevNumSkills + 1;
                                    onAdd(updatedNumSkills);
                                    return updatedNumSkills;
                              });
                        }
                  }
                  catch (error) {
                        alert(error);
                  }
            }
      };

      const handleDelete = async (skillToDelete) => {
            try {
                  await API.del("api", "/skill/" + skillToDelete.skillid, {
                    headers: {
                      Authorization: `Bearer ${(await Auth.currentSession())
                        .getAccessToken()
                        .getJwtToken()}`,
                    }
                  })
                  const indexToDelete = currentSkills.findIndex(skill => skill.skillid === skillToDelete.skillid);
                  if (indexToDelete !== -1) {
                        setCurrentSkills(prevSkills => {
                              const updatedSkills = [...prevSkills];
                              updatedSkills.splice(indexToDelete, 1);
                              return updatedSkills;
                        });
                        setNumSkills(prevNumSkills => {
                              const updatedNumSkills = prevNumSkills - 1;
                              onDelete(updatedNumSkills);
                              return updatedNumSkills;
                        }); 
                  }
                }
                catch (error) {
                  alert(error);
                }
      }

      const handleEdit = async () => {
      
      }

      return (
            <>
                  <div className="add-skill">
                        <form className="add-skill-form">
                              <h6 className="form-label">Skill description</h6>
                              <input type="text"
                                     id="description"
                                     className="form-input"
                                     name="description"
                                     value={search ? search : ""}
                                     onChange={handleInputChange} />
                        </form>
                        <BsSearch className="icon-large icon-margin-top" />
                        {search && filteredSkills.length === 0 ? (
                              <img
                                    className="plus-button add-skill-button"
                                    src="./plus-icon-80x80.png"
                                    alt="Plus icon"
                                    onClick={handleAddClick}
                              />
                        ) : (
                              <img
                                    className="plus-button add-skill-button disabled"
                                    src="./plus-icon-80x80.png"
                                    alt="Plus icon"
                              />
                        )}  
                  </div>
                  <ul className="edit-skills-list">
                        {skills && skills.length > 0 ? (
                              filteredSkills.length > 0 ? (
                                    filteredSkills.map((item) => (
                                          <EditSkillRow key={item.skillid}
                                                        skill={item}
                                                        onDelete={handleDelete}
                                                        onEdit={handleEdit} />
                                    ))
                              ) : (
                                    <h4>No matching skills found</h4>
                                  )
                        ) : (
                              <h2>You have no skills saved. Try adding some skills!</h2>
                        )}
                  </ul>
            </>
      );
};

export default EditSkills;