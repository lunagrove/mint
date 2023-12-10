import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useState, useEffect } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Tips from '../components/Tips';
import { useData } from '../utilities/DataContext';

const AddSnippet = ({ onSubmit, onClose }) => {

    const { userData, updateUserData } = useData();

    const [selectSkills, setSelectSkills] = useState([]);

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
            setSelectSkills(formattedSkills);
        }
    }, [userData.skills]);

    const handleChange = (e) => {
        setSnippet(e.target.value);    
    };

    const handleSubmit = () => {
        onSubmit(snippet);
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

    return (
        <div className="panel-contents2">
            <div className="panel-row">
                <form className="add-snippet-form">
                    <div className="add-snippet-heading">
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
                            rows="6"
                            cols="50"
                            onChange={(e) => handleChange(e)}>
                    </textarea>
                    <h4 className={`character-count ${isCharacterCountExceeded ? 'exceeded' : ''}`}>{characterCount} / 300</h4>
                </form>
                <div className="snippet-tagging">
                    <div className="add-snippet-heading">
                        <h4 className="form-label">Where did you gain this experience?</h4>
                        <IoMdInformationCircleOutline className="icon-large tips-icon"
                                                    onClick={(e) => openTips(e, 0)} />
                    </div>
                </div>
                <div className="snippet-tagging">
                    <div className="add-snippet-heading">
                        <h4 className="form-label">Skills demonstrated</h4>
                        <IoMdInformationCircleOutline className="icon-large tips-icon"
                                                      onClick={(e) => openTips(e, 1)} />
                    </div>
                    <div className="add-snippet-tags"> 
                        {selectSkills && <Select closeMenuOnSelect={false}
                                                 components={animatedComponents}
                                                 isMulti
                                                 options={selectSkills}
                                                 blurInputOnSelect={false} />}
                    </div>
                </div>
            </div>
            <div className="panel-footer">
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