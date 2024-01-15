import React from 'react';
import { useState, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { FaSpinner } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { resumeTemplates } from "../utilities/constants";
import IconButton from "../components/IconButton";
import html2pdf from "html2pdf.js";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { PiFolderOpenLight } from "react-icons/pi";
import { IoTrashOutline } from "react-icons/io5";
import Tips from '../components/Tips';
import { useData } from '../utilities/DataContext';
import { fetchResumes } from "../utilities/fetchData";
import { formatLongDate } from "../utilities/dates";
import Dialog from './Dialog';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const ResumeBuilder = ({ onApply, onSave, onDelete, resume }) => {

  const {user} = useAuthenticator((context) => [context.user]);
  const { userData, updateUserData } = useData();

  const [loadingResumes, setLoadingResumes] = useState(false);
  const [isSpinningResumes, setIsSpinningResumes] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [resumeToEdit, setResumeToEdit] = useState(resume);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [includeSkills, setIncludeSkills] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [useDescs, setUseDescs] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [useIntro, setUseIntro] = useState(false);
  const [editedName, setEditedName] = useState('Default');
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [selectedTipIndex, setSelectedTipIndex] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tabIndex, setTabIndex] = useState(0);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const animatedComponents = makeAnimated();

  useEffect(() => {
    if (user && userData.resumes && userData.resumes.length === 0) {
        setLoadingResumes(true);
        fetchData("resumes");
    }
    if (Array.isArray(userData.skills)) {
      const formattedSkills = userData.skills.map(skill => ({
          value: skill.skillid,
          label: skill.description
      }));
      console.log('formatted skills', formattedSkills);
      setSkills(formattedSkills);
    }
    setResumeToEdit(resume); 
  }, []);

  const handleUpdateData = (newData) => {
    updateUserData((prevUserData) => {
        return {
        ...prevUserData,
        resumes: newData,
        };
    });
  };

  useEffect(() => {
    if (isSpinningResumes) {
        fetchData("resumes");
    }
  }, [isSpinningResumes]);

  const fetchData = async (dataType) => {
    if (dataType === "resumes") {
      const resumes = await fetchResumes();
      if (resumes) {
        setIsSpinningResumes(false);
        setLoadingResumes(false);
        handleUpdateData(resumes);
      }
    }
  };

  const handleRefreshResumes = () => {
    setLoadingResumes(true);
    setIsSpinningResumes(true);
  };

  const handleSelectTemplate = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedText = e.target.options[selectedIndex].text;
    setSelectedTemplate(e.target.value);
    if (selectedIndex === 0) {
      setTemplateName('');
    }
    else {
      setTemplateName(selectedText);
    }
    setIncludeSkills(true);
    setShowEmail(true);
    setShowPhone(true);
    setUseIntro(true);
  };

  const handleIncludeSkillsChange = (e) => {
    setIncludeSkills(e.target.checked);
  };

  const handleShowEmailChange = (e) => {
    setShowEmail(e.target.checked);
  };

  const handleShowPhoneChange = (e) => {
    setShowPhone(e.target.checked);
  };

  const handleUseDescsChange = (e) => {
    setUseDescs(e.target.checked);
  };

  const handleShowHistoryChange = (e) => {
    setShowHistory(e.target.checked);
  };

  const handleUseIntroChange = (e) => {
    setUseIntro(e.target.checked);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const generatePDF = () => {
    var opt = {
      margin:       1,
      enablelinks:  true,
      jsPDF:        { unit: 'cm', format: 'A4', orientation: 'portrait' }
    };
    const content = document.getElementById('resume-page');
    html2pdf().set(opt).from(content).save(`${editedName}.pdf`);
  };

  const saveResume = () => {
    onSave(resumeToEdit, selectedTemplate, templateName, includeSkills, showEmail, showPhone,
      useDescs, showHistory, useIntro); 
  };

  const handleApplyClick = () => {
    onApply(resumeToEdit, selectedTemplate, templateName, includeSkills, showEmail, showPhone,
      useDescs, showHistory, useIntro, selectedSkills); 
  };

  const handlePanelClick = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleOpenResume = (resume) => {
    setResumeToEdit(resume);
    setIsEditing(true);
    loadResume(resume.resumeid);
    onApply(false, resumeToEdit, selectedTemplate, templateName, includeSkills, showEmail, showPhone,
            useDescs, showHistory, useIntro); 
  };

  const loadResume = (resumeid) => {
    const resumeIndex = userData.resumes.findIndex((resume) => resume.resumeid === resumeid);
    if (resumeIndex !== -1) {
      const resume = userData.resumes[resumeIndex];
      const template = resumeTemplates.find((template) => template.caption === resume.template);
      setSelectedTemplate(template.component);
      setTemplateName(resume.template);
      setIncludeSkills(resume.includeskills);
      setShowEmail(resume.showemail);
      setShowPhone(resume.showphone);
      setUseDescs(resume.usedescs);
      setShowHistory(resume.showhistory);
      setUseIntro(resume.useintro);
      setTabIndex(0);
    }
  };

  const handleDeleteClick = (resume) => {
    setResumeToDelete(resume);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
      setDeleteDialogOpen(false);
      onDelete(resumeToDelete.resumeid);
  };

  const handleCancelDelete = () => {
      setDeleteDialogOpen(false);
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

  return (
    <>
      <Tabs selectedIndex={tabIndex ? tabIndex : 0} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Layout</Tab>
          <Tab>Content</Tab>
          <Tab>Export</Tab>
          <Tab>Saved Resumes</Tab>
        </TabList>
        <TabPanel>
          <div className="layout-container">
            <div className="input-fields">
              <h3>Resume template</h3>
              <select className="form-select select-template"
                      onChange={handleSelectTemplate}
                      value={selectedTemplate}>
                <option value="">Select template...</option>
                {resumeTemplates.map((template, index) => (
                  <option key={index} value={template.component}>{template.caption}</option>
                ))}
              </select>
              <h3>Settings</h3>
              <div className="checkbox-row">
                <input type="checkbox"
                       className="checkbox-resume"
                       checked={includeSkills}
                       onChange={handleIncludeSkillsChange}
                />
                <h3 className="checkbox-label">Include skills list?</h3>
              </div>
              <div className="checkbox-row">
                <input type="checkbox"
                       className="checkbox-resume"
                       checked={showEmail}
                       onChange={handleShowEmailChange}
                />
                <h3 className="checkbox-label">Show email address?</h3>
              </div>
              <div className="checkbox-row">
                <input type="checkbox"
                       className="checkbox-resume"
                       checked={showPhone}
                       onChange={handleShowPhoneChange}
                />
                <h3 className="checkbox-label">Show phone number?</h3>
              </div>
              <div className="checkbox-row">
                <input type="checkbox"
                       className="checkbox-resume"
                       checked={useDescs}
                       onChange={handleUseDescsChange}
                />
                <h3 className="checkbox-label">Use company and institution descriptions?</h3>
              </div>
              <div className="checkbox-row">
                <input type="checkbox"
                       className="checkbox-resume"
                       checked={showHistory}
                       onChange={handleShowHistoryChange}
                />
                <h3 className="checkbox-label">Show all history?</h3>
                <IoMdInformationCircleOutline className="icon-large tips-icon"
                                              onClick={(e) => openTips(e, 2)} />
              </div>
              <div className="checkbox-row">
                <input type="checkbox"
                       className="checkbox-resume"
                       checked={useIntro}
                       onChange={handleUseIntroChange}
                />
                <h3 className="checkbox-label">Use intro statements?</h3>
              </div>
            </div>
            <div className="panel-footer">
              <div className="panel-show-hide" onClick={handlePanelClick}>
                {isPanelOpen ? <MdOutlineKeyboardArrowRight /> : <MdOutlineKeyboardArrowLeft />}
                  <h5>{isPanelOpen ? 'Hide' : 'Show'} panel</h5>
              </div>
              <button type="button"
                      className="modal-button resume-apply-button"
                      id="cancelBtn"
                      onClick={handleApplyClick}>Apply</button>
            </div>
          </div>

        </TabPanel>
        <TabPanel>
          <div className="content-container">
            <div>
              {useIntro && (
                <>
                  <h3>Which introductory statements do you want to include?</h3>
                  {userData.intro && userData.intro.length > 0 && (
                    userData.intro.map((item) => (
                      <div key={item.introid} className="t1-intro-statement">
                        {item.snippet}
                      </div>
                    ))
                  )}
                </>
              )}
              <h3>What skills do you want to demonstrate?</h3>
              {skills && <Select closeMenuOnSelect={false}
                                 theme={customTheme}
                                 components={animatedComponents}
                                 placeholder="Select skills..."
                                 isMulti={true}
                                 options={skills}
                                 blurInputOnSelect={false}
                                 id="skills"
                                 maxMenuHeight={300}
                                 menuPlacement={"auto"}
                                 onChange={setSelectedSkills} />}
              <h3>Matching Experience</h3>
            </div>
            <div className="panel-footer">
              <div className="panel-show-hide" onClick={handlePanelClick}>
                {isPanelOpen ? <MdOutlineKeyboardArrowRight /> : <MdOutlineKeyboardArrowLeft />}
                  <h5>{isPanelOpen ? 'Hide' : 'Show'} panel</h5>
              </div>
              <button type="button"
                      className="modal-button resume-apply-button"
                      id="cancelBtn"
                      onClick={handleApplyClick}>Apply</button>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="export-panel">
            <div>
              <h5 className="form-label">Resume name:</h5>
              <input type="text"
                      id="name"
                      className="form-input resume-name"
                      name="name"
                      autoComplete="off"
                      onChange={(e) => handleNameChange(e)} />
              <div className="export-buttons">
                <IconButton iconType="download"
                            caption="Export as PDF"
                            type="click"
                            linkTo=""
                            size="wide"
                            onClick={generatePDF} />
                <IconButton iconType="save"
                            caption="Save to Profile"
                            type="click"
                            linkTo=""
                            size="wide"
                            onClick={saveResume} />
              </div>
            </div>
            <div className="panel-footer">
              <div className="panel-show-hide" onClick={handlePanelClick}>
                {isPanelOpen ? <MdOutlineKeyboardArrowRight /> : <MdOutlineKeyboardArrowLeft />}
                  <h5>{isPanelOpen ? 'Hide' : 'Show'} panel</h5>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="layout-container">
            {loadingResumes ? (
                <div className="resume-list resume-list-loading">
                    <FaSpinner className="spin icon-large" />
                </div>
            ) : (
              <>
                {userData.resumes && userData.resumes.length > 0 &&
                  <div className="resumes-panel-heading">
                    <h3>Resumes</h3>
                    <LuRefreshCw className={`icon-medium refresh-icon ${isSpinningResumes ? 'spin' : ''}`}
                                 onClick={handleRefreshResumes} />
                  </div>
                }
                <div className="resume-list">
                  {userData.resumes && userData.resumes.length > 0 ? (  
                    userData.resumes.map((resume) => (
                      <div className="resume-row" key={resume.resumeid}>
                        <p>{resume.resumename}</p>
                        <p>{formatLongDate(resume.createdon, false)}</p>
                        <div className="resume-list-icons">
                          <PiFolderOpenLight className="icon-medium edit-icon"
                                            onClick={() => handleOpenResume(resume)} />
                          <IoTrashOutline className="icon-medium edit-icon"
                                          onClick={() => handleDeleteClick(resume)}/>
                        </div>
                      </div>
                    ))           
                  ) : (
                    <div className="center-vertically">
                      <h2>You have no resumes saved!</h2>
                    </div>
                  )}
                </div>
                <div className="panel-footer">
                  <div className="panel-show-hide" onClick={handlePanelClick}>
                    {isPanelOpen ? <MdOutlineKeyboardArrowRight /> : <MdOutlineKeyboardArrowLeft />}
                      <h5>{isPanelOpen ? 'Hide' : 'Show'} panel</h5>
                  </div>
                </div>
              </>
            )}
          </div>
        </TabPanel>
      </Tabs>
      {isTipsOpen && <Tips tipIndex={selectedTipIndex}
                           onClose={closeTips}
                           position={position} />}
      {isDeleteDialogOpen && (
          <Dialog
              type="Warning"
              heading="Confirm Delete Resume"
              text="Are you sure you want to delete this resume?"
              onCancel={handleCancelDelete}
              onConfirm={handleConfirmDelete}
          />
      )}
    </>
  );
};

export default ResumeBuilder;