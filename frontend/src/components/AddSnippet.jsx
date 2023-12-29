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
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [snippet, setSnippet] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
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
        let experienceTags = [];
        const createCategoryOptions = (label, items) => ({
            label,
            options: items.map(item => ({ label: item.label, value: item.value }))
        });
        if (userData.companies && userData.companies.length > 0) {
            const roles = userData.companies.flatMap(company =>
                company.details.map(role => ({
                    label: role.description,
                    value: `${role.id}+role`,
                    category: 'Roles'
                }))
            );
            experienceTags.push(createCategoryOptions('Roles', roles));
        }
        if (userData.education && userData.education.length > 0) {
            const courses = userData.education.flatMap(institution =>
                institution.details.map(course => ({
                    label: course.description,
                    value: `${course.id}+${course.type}`,
                    category: 'Courses and Credentials'
                }))
            );
            experienceTags.push(createCategoryOptions('Courses and Credentials', courses));
        }
        if (userData.hobbies && userData.hobbies.length > 0) {
            const hobbies = userData.hobbies.map(hobby => ({            
                label: hobby.description,
                value: `${hobby.hobbyid}+hobby`,
                category: 'Hobbies and Clubs'
            }));
            experienceTags.push(createCategoryOptions('Hobbies and Clubs', hobbies));
        }       
        if (userData.projects && userData.projects.length > 0) {
            const projects = userData.projects.map(project => ({
                label: project.description,
                value: `${project.projectid}+project`,
                category: 'Projects'
            }));
            experienceTags.push(createCategoryOptions('Projects', projects));
        }
        setTags(experienceTags);       
    }, []);

    const formatGroupLabel = (data) => (
        <div style={{ color: '#000000', fontWeight: '900' , fontSize: '16px'}}>
          <span>{data.label}</span>
          <span>{` (${data.options.length})`}</span>
        </div>
    );

    const handleChange = (e) => {
        setSnippet(e.target.value); 
        setCharacterCount(e.target.value.length);   
    };

    const handleSubmit = () => {
        onSubmit(snippet, selectedSkills, selectedTag);
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

    const isCharacterCountExceeded = characterCount > 300;

    function customTheme(theme) {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: "#e0e0e0",
                primary: "#e0e0e0"
            }
        };
    };

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
                        {tags && <Select options={tags}
                                         formatGroupLabel={formatGroupLabel}
                                         theme={customTheme}
                                         maxMenuHeight={160}
                                         placeholder="Select..."
                                         isClearable={true}
                                         menuPlacement={"auto"}
                                         onChange={setSelectedTag} />}
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