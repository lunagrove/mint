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
    const [selectedTags, setSelectedTags] = useState([]);

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
        let experienceTags = [];

        const createCategoryOptions = (label, items) => ({
            label,
            options: items.map(item => ({ label: item.label }))
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
                    value: `${course.id}+course`,
                    category: 'Courses and Credentials'
                }))
            );
            experienceTags.push(createCategoryOptions('Courses and Credentials', courses));
        }
        if (userData.hobbies && userData.hobbies.length > 0) {
            const hobbies = userData.hobbies.map(hobby => ({            
                label: hobby.description,
                value: `${hobby.hobbyid}+hobby`,
                category: 'Hobbies'
            }));
            experienceTags.push(createCategoryOptions('Hobbies', hobbies));
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
    };

    const handleSubmit = () => {
        onSubmit(snippet, selectedSkills, selectedTags);
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

    console.log('tags', tags);

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
                        {tags && <Select closeMenuOnSelect={false}
                                         components={animatedComponents}
                                         isMulti={true}
                                         options={tags}
                                         blurInputOnSelect={false}
                                         id="tags"
                                         maxMenuHeight={160}
                                         menuPlacement={"auto"}
                                         onChange={setSelectedTags}
                                         formatGroupLabel={formatGroupLabel} />}
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
                    <div className="snippet-add-tags"> 
                        {skills && <Select closeMenuOnSelect={false}
                                            components={animatedComponents}
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