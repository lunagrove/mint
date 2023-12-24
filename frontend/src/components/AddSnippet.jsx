import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useState, useEffect } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Tips from '../components/Tips';
import { useData } from '../utilities/DataContext';

const AddSnippet = ({ onSubmit, onClose }) => {

    const { userData, updateUserData } = useData();

    const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [hobbies, setHobbies] = useState([]);
    const [selectedHobby, setSelectedHobby] = useState(null);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    const [snippet, setSnippet] = useState('');
    const [isTipsOpen, setIsTipsOpen] = useState(false);
    const [selectedTipIndex, setSelectedTipIndex] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const animatedComponents = makeAnimated();

    useEffect(() => {
        if (Array.isArray(userData.skills)) {
            const formattedSkills = userData.skills.map(skill => ({
                value: skill.skillid,
                label: skill.description
            }));
            setSkills(formattedSkills);
        }
    }, [userData.skills]);

    useEffect(() => {
        let tags = [];
        if (userData.companies && userData.companies.length > 0) {
            tags = userData.companies.flatMap(company =>
                company.details.map(role => ({
                    label: role.description,
                    value: role.id
                }))
            );
            setRoles(tags);
        }
        tags = [];
        if (userData.education && userData.education.length > 0) {
            tags = userData.education.flatMap(institution =>
                institution.details.map(course => ({
                    label: course.description,
                    value: course.id
                }))
            );
            setCourses(tags);
        }
        tags = [];
        if (userData.hobbies && userData.hobbies.length > 0) {
            tags = userData.hobbies.map(hobby => ({            
                label: hobby.description,
                value: hobby.hobbyid
            }));
            setHobbies(tags);
        }  
        tags = [];     
        if (userData.projects && userData.projects.length > 0) {
            tags = userData.projects.map(project => ({
                label: project.description,
                value: project.projectid
            }));
            setProjects(tags);
        }       
    }, []);

    const handleChange = (e) => {
        setSnippet(e.target.value);    
    };

    const handleSubmit = () => {
        onSubmit(snippet, selectedSkills, selectedRole, selectedCourse, selectedHobby, selectedProject);
        handleClose();
    };

    const handleClose = () => {
        onClose();
    };

    const openTips = (e, index) => {
        const x = e.clientX + window.scrollX;
        const y = e.clientY + window.scrollY;
        setPosition({x, y});
        setSelectedTipIndex(index);
        setIsTipsOpen(true);
    };
    
    const closeTips = () => {
        setIsTipsOpen(false);
    };

    const characterCount = snippet.length;
    const isCharacterCountExceeded = characterCount > 300;

    function customTheme(theme) {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: "#e0e0e0",
                primary: 'grey'
            }
        };
    }

    return (
        <div className="snippet-panel-contents">
            <div className="snippet-panel-row">
                <div className="snippet-tagging">
                    <div className="snippet-add-heading">
                        <h4 className="form-label">Where did you gain this experience?</h4>
                        <IoMdInformationCircleOutline className="icon-large tips-icon"
                                                      onClick={(e) => openTips(e, 0)} />
                    </div>
                    <div className="snippet-add-tags"> 
                        {roles && <Select options={roles}
                                          theme={customTheme}
                                          components={animatedComponents}
                                          maxMenuHeight={160}
                                          placeholder="Select role..."
                                          isClearable={true}
                                          menuPlacement={"auto"}
                                          onChange={setSelectedRole} />}
                        {courses && <Select options={courses}
                                            theme={customTheme}
                                            components={animatedComponents}
                                            maxMenuHeight={160}
                                            placeholder="Select course or credential..."
                                            isClearable={true}
                                            menuPlacement={"auto"}
                                            onChange={setSelectedCourse} />}
                        {hobbies && <Select options={hobbies}
                                            theme={customTheme}
                                            components={animatedComponents}
                                            maxMenuHeight={160}
                                            placeholder="Select hobby..."
                                            isClearable={true}
                                            menuPlacement={"auto"}
                                            onChange={setSelectedHobby} />}
                        {projects && <Select options={projects}
                                             theme={customTheme}
                                             components={animatedComponents}
                                             maxMenuHeight={160}
                                             placeholder="Select project..."
                                             isClearable={true}
                                             menuPlacement={"auto"}
                                             onChange={setSelectedProject} />}
                    </div>
                </div>
                <form className="snippet-add-form">
                    <div className="snippet-add-heading">
                        <h4 className="form-label">Describe your experience</h4>
                        <IoMdInformationCircleOutline className="icon-large tips-icon"
                                                      onClick={(e) => openTips(e, 1)} />
                    </div>
                    {isTipsOpen && <Tips tipIndex={selectedTipIndex}
                                         onClose={closeTips}
                                         position={position} />}

                    <textarea className="form-textarea"
                              id="snippet" 
                              name="snippet"
                              rows="8"
                              cols="50"
                              onChange={(e) => handleChange(e)}>
                    </textarea>
                    <h4 className={`character-count ${isCharacterCountExceeded ? 'exceeded' : ''}`}>{characterCount} / 300</h4>
                </form>
                <div className="snippet-tagging">
                    <div className="snippet-add-heading">
                        <h4 className="form-label">Skills demonstrated</h4>
                        <IoMdInformationCircleOutline className="icon-large tips-icon"
                                                      onClick={(e) => openTips(e, 1)} />
                    </div>
                    <div className="snippet-add-skills"> 
                        {skills && <Select closeMenuOnSelect={false}
                                           theme={customTheme}
                                           components={animatedComponents}
                                           placeholder="Select skills..."
                                           isMulti={true}
                                           options={skills}
                                           blurInputOnSelect={false}
                                           id="skills"
                                           maxMenuHeight={160}
                                           menuPlacement={"auto"}
                                           onChange={setSelectedSkills} />}
                    </div>
                </div>
            </div>
            <div className="snippet-panel-footer">
                <button type="submit"
                        className="formbutton focused"
                        id="submitBtn"
                        onClick={handleSubmit}>Save</button>
                <button type="button"
                        className="formbutton"
                        id="cancelBtn"
                        onClick={handleClose}>Close</button>
            </div>
        </div>
    );
}

export default AddSnippet;