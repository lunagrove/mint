import React from 'react';
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { resumeTemplates } from "../utilities/constants";
import IconButton from "../components/IconButton";
import html2pdf from 'html2pdf.js';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Tips from '../components/Tips';

const ResumeBuilder = ({ onApply }) => {

  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [selectedTipIndex, setSelectedTipIndex] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleSelectTemplate = (e) => {
    setSelectedTemplate(e.target.value);
  };

  const handleShowEmailChange = (e) => {
    setShowEmail(e.target.checked);
  };

  const handleShowPhoneChange = (e) => {
    setShowPhone(e.target.checked);
  };

  const handleShowIntroChange = (e) => {
    setShowIntro(e.target.checked);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const generatePDF = () => {
    const content = document.getElementById('resume-page');
    html2pdf().from(content).save('resume.pdf');
  };

  const savePDF = () => {
     
  };

  const handleApplyClick = () => {
    onApply(selectedTemplate, showEmail, showPhone, showIntro);   
  };

  const handlePanelClick = () => {
    setIsPanelOpen(!isPanelOpen);
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

  return (
    <>
      <Tabs>
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
                      onChange={handleSelectTemplate}>
                <option value="">Select template...</option>
                {resumeTemplates.map((template, index) => (
                  <option key={index} value={template.component}>{template.caption}</option>
                ))}
              </select>
              <h3>Settings</h3>
              <div className="checkbox-row">
                <input type="checkbox"
                       className="checkbox-resume"
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
                />
                <h3 className="checkbox-label">Use company and institution descriptions?</h3>
              </div>
              <div className="checkbox-row">
                <input type="checkbox"
                       className="checkbox-resume"
                />
                <h3 className="checkbox-label">Show all history?</h3>
                <IoMdInformationCircleOutline className="icon-large tips-icon"
                                              onClick={(e) => openTips(e, 2)} />
              </div>
              <div className="checkbox-row">
                <input type="checkbox"
                       className="checkbox-resume"
                       checked={showIntro}
                       onChange={handleShowIntroChange}
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
          <div className="layout-container">
            <div>

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
                            onClick={savePDF} />
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
            <div>

            </div>
            <div className="panel-footer">
              <div className="panel-show-hide" onClick={handlePanelClick}>
                {isPanelOpen ? <MdOutlineKeyboardArrowRight /> : <MdOutlineKeyboardArrowLeft />}
                  <h5>{isPanelOpen ? 'Hide' : 'Show'} panel</h5>
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>
      {isTipsOpen && <Tips tipIndex={selectedTipIndex}
                           onClose={closeTips}
                           position={position} />}
    </>
  );
};

export default ResumeBuilder;