import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useState, useEffect } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import Tips from '../components/Tips';
import { useData } from '../utilities/DataContext';

const EditSnippet = ({ snippet, onSave, onCancel }) => {

    const { userData, updateUserData } = useData();

    const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [characterCount, setCharacterCount] = useState(snippet.snippet ? snippet.snippet.length : 0);
    const [editedDescription, setEditedDescription] = useState(snippet.snippet ? snippet.snippet : '');
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

        const findDetailById = (id, type) => {
            let detail = {};
            if (type === 'role') {
                for (const company of userData.companies) {
                    detail = company.details.find((detailObj) => detailObj.id === id);
                    if (detail) {
                        break;
                    }
                }
            }
            if (type === 'course' || type === 'credential') {
                for (const education of userData.education) {
                    detail = education.details.find((detailObj) => detailObj.id === id &&
                                                                   detailObj.type === type);
                    if (detail) {
                        break;
                    }
                }
            }
            return detail;
        };

        if (snippet.tagid) {
            let obj = {};
            switch (snippet.tagtype) {
                case 'project':
                    obj = userData.projects.find(project => project.projectid === snippet.tagid);
                    break;
                case 'hobby':
                    obj = userData.hobbies.find(hobby => hobby.hobbyid === snippet.tagid);
                    break;
                case 'role':
                    obj = findDetailById(snippet.tagid, snippet.tagtype)
                    break;
                case 'course':
                    obj = findDetailById(snippet.tagid, snippet.tagtype)
                    break;
                case 'credential':
                    obj = findDetailById(snippet.tagid, snippet.tagtype)
                    break;
            }
            let desc = '';
            if (obj) {
                desc = obj.description;
            }
            setSelectedTag({ value: `${snippet.tagid}+${snippet.tagtype}`, label: desc });
        };

        if (snippet.skillids && snippet.skillids.length > 0) {
            let skillObjs = [];
            skillObjs = snippet.skillids.map((skillid) => {
                const foundSkill = userData.skills.find((skill) => skill.skillid === skillid);
                return {
                    label: foundSkill.description,
                    value: skillid
                };
            });
            setSelectedSkills(skillObjs);
        }
    }, []);

    const formatGroupLabel = (data) => (
        <div style={{ color: '#000000', fontWeight: '900' , fontSize: '16px'}}>
          <span>{data.label}</span>
          <span>{` (${data.options.length})`}</span>
        </div>
    );

    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.value);
        setCharacterCount(e.target.value.length); 
    };

    const handleSave = () => {
        onSave(snippet.experienceid, editedDescription, selectedSkills, selectedTag);
        handleCancel();
    };

    const handleCancel = () => {
        onCancel();
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

    const isCharacterCountExceeded = characterCount > 300;

    return (
        <>
            <div className="experience-edit-contents">
                <div className="snippet-edit-row">
                    <div className="snippet-edit-tagging">
                        <div className="snippet-edit-heading">
                            <h4 className="form-label">Where did you gain this experience?</h4>
                            <IoMdInformationCircleOutline className="icon-large tips-icon"
                                                        onClick={(e) => openTips(e, 0)} />
                        </div>
                        <div className="snippet-edit-tags"> 
                            {tags && <Select options={tags}
                                            formatGroupLabel={formatGroupLabel}
                                            theme={customTheme}
                                            maxMenuHeight={160}
                                            placeholder="Select..."
                                            value={selectedTag}
                                            isClearable={true}
                                            menuPlacement={"auto"}
                                            onChange={setSelectedTag} />}
                        </div>
                    </div>
                    <div className="snippet-edit-form">
                        <div className="snippet-edit-heading">
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
                                value={editedDescription}
                                onChange={(e) => handleDescriptionChange(e)}>
                        </textarea>
                        <h4 className={`character-count ${isCharacterCountExceeded ? 'exceeded' : ''}`}>{characterCount} / 300</h4>
                    </div>
                    <div className="snippet-edit-tagging">
                        <div className="snippet-edit-heading">
                            <h4 className="form-label">Skills demonstrated</h4>
                            <IoMdInformationCircleOutline className="icon-large tips-icon"
                                                        onClick={(e) => openTips(e, 1)} />
                        </div>
                        <div className="snippet-edit-skills"> 
                            {skills && <Select closeMenuOnSelect={false}
                                            theme={customTheme}
                                            components={animatedComponents}
                                            placeholder="Select skills..."
                                            isMulti={true}
                                            options={skills}
                                            value={selectedSkills}
                                            blurInputOnSelect={false}
                                            id="skills"
                                            maxMenuHeight={160}
                                            menuPlacement={"auto"}
                                            onChange={setSelectedSkills} />}
                        </div>
                    </div>
                </div>
                <div className="experience-edit-icons">
                    <FiCheckCircle className="icon-large save-icon" onClick={handleSave} />
                    <MdOutlineCancel className="icon-large cancel-icon" onClick={handleCancel} />
                </div>
            </div>
        </>
    );
}

export default EditSnippet;