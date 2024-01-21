import { useState, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import html2pdf from "html2pdf.js";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { FaSpinner } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { PiFolderOpenLight } from "react-icons/pi";
import { IoTrashOutline } from "react-icons/io5";
import { VscOpenPreview } from "react-icons/vsc";
import { IoHammerOutline } from "react-icons/io5";
import Tips from '../components/Tips';
import { resumeTemplates } from "../utilities/constants";
import IconButton from "../components/IconButton";
import Resume from "../components/Resume";
import Dialog from '../components/Dialog';
import { useData } from '../utilities/DataContext';
import { fetchSnippets, fetchProfile, fetchIntro, fetchSkills, fetchEducation, fetchCompanies,
    fetchHobbies, fetchProjects, fetchResumes } from "../utilities/fetchData";
import { formatLongDate } from "../utilities/dates";

const ResumePage = () => {

    const {user} = useAuthenticator((context) => [context.user]);
    const { userData, updateUserData } = useData();

    const [loadingResumes, setLoadingResumes] = useState(false);
    const [isSpinningResumes, setIsSpinningResumes] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [resumeToEdit, setResumeToEdit] = useState(null);
    const [resumeToDelete, setResumeToDelete] = useState(null);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [showTemplate, setShowTemplate] = useState(true);
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
        if (user && userData.snippets && userData.snippets.length === 0) {
            fetchData("snippets");
        }  
        if (user && userData.profile && !userData.profile.userid) {
            fetchData("profile");
        }
        if (user && userData.intro && userData.intro.length === 0) {
            fetchData("intro");
        }
        if (user && userData.skills && userData.skills.length === 0) {
            fetchData("skills");
        }
        if (user && userData.hobbies && userData.hobbies.length === 0) {
            fetchData("hobbies");
        }
        if (user && userData.projects && userData.projects.length === 0) {
            fetchData("projects");
        }
        if (user && userData.companies && userData.companies.length === 0) {
            fetchData("companies");
        }
        if (user && userData.education && userData.education.length === 0) {
            fetchData("education");
        } 
        if (user && userData.resumes && userData.resumes.length === 0) {
            setLoadingResumes(true);
            fetchData("resumes");
        } 
        const currentResume = { 
            template: 'ResumeTemplate1',
            includeSkills: false,
            showEmail: false,
            showPhone: false,
            useDescs: false,
            showHistory: false,
            useIntro: false,
            skills: [],
            intro: [] }
        userData.currentResume = currentResume;
        setSelectedTemplate('ResumeTemplate1');
        if (Array.isArray(userData.skills)) {
            const formattedSkills = userData.skills.map(skill => ({
                value: skill.skillid,
                label: skill.description
            }));
            setSkills(formattedSkills);
        }
    }, []);

    useEffect(() => {
        console.log('userData: ', userData);
    }, [userData]);
    
    useEffect(() => {
        if (isSpinningResumes) {
            fetchData("resumes");
        }
    }, [isSpinningResumes]);
    
    const fetchData = async (dataType) => {
        if (dataType === "snippets") {
            const snippets = await fetchSnippets();
            if (snippets) {
                handleUpdateData('snippets', snippets);
            }
        }
        if (dataType === "intro") {
            const intro = await fetchIntro();
            if (intro) {
                handleUpdateData('intro', intro);
            }
        }
        if (dataType === "profile") {
            const profile = await fetchProfile();
            if (profile) {
                handleUpdateData('profile', profile);
            }
        }
        if (dataType === "skills") {
            const skills = await fetchSkills();
            if (skills) {
              handleUpdateData('skills', skills);
            }
        }
        if (dataType === "education") {
            const education = await fetchEducation();
            if (education) {
              handleUpdateData('education', education);
            }
        }
        if (dataType === "companies") {
            const companies = await fetchCompanies();
            if (companies) {
              handleUpdateData('companies', companies);
            }
        }
        if (dataType === "hobbies") {
            const hobbies = await fetchHobbies();
            if (hobbies) {
              handleUpdateData('hobbies', hobbies);
            }
        }
        if (dataType === "projects") {
            const projects = await fetchProjects();
            if (projects) {
              handleUpdateData('projects', projects);
            }
        }
        if (dataType === "resumes") {
            const resumes = await fetchResumes();
            if (resumes) {
              setIsSpinningResumes(false);
              setLoadingResumes(false);
              handleUpdateData('resumes', resumes);
            }
        }
    };

    const handleUpdateData = (dataType, newData) => {
        updateUserData((prevUserData) => ({
            ...prevUserData,
            [dataType]: newData       
        }));
    };

    const handleRefreshResumes = () => {
        setLoadingResumes(true);
        setIsSpinningResumes(true);
    };

    const handleSelectTemplate = (e) => {
        const selectedIndex = e.target.selectedIndex;
        const selectedText = e.target.options[selectedIndex].text;
        setSelectedTemplate(e.target.value);
        /* if (selectedIndex === 0) {
            setTemplateName('');
        }
        else { */
            setTemplateName(selectedText);
        // }
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

    const handlePanelClick = () => {
        setIsPanelOpen(!isPanelOpen);
    };
    
    const handleOpenResume = (resume) => {
        setResumeToEdit(resume);
        setIsEditing(true);
        loadResume(resume.resumeid);
        onApply(resumeToEdit, selectedTemplate, templateName, includeSkills, showEmail, showPhone,
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
    
    const handleDeleteResume = (resume) => {
        setResumeToDelete(resume);
        setDeleteDialogOpen(true);
    };
    
    const handleConfirmDelete = () => {
        setDeleteDialogOpen(false);
        handleDeleteClick(resumeToDelete.resumeid);
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

    const handleSelectIntro = () => {
        
    };

    const handleApplyClick = async () => {
        setShowTemplate(false);
        const currentResume = { 
                    template: templateName,
                    includeSkills: includeSkills,
                    showEmail: showEmail,
                    showPhone: showPhone,
                    useDescs: useDescs,
                    showHistory: showHistory,
                    useIntro: useIntro,
                    skills: includeSkills ? selectedSkills : [],
                    intro: useIntro ? userData.intro : [] }
        await updateUserData((prevUserData) => {
            return {
                ...prevUserData,
                currentResume
            };
        });      
    };

    const handleSaveClick = async (newResume, newTemplate, newTemplateName, newIncludeSkills, newShowEmail, newShowPhone, newUseDescs, newShowHistory, newUseIntro) => {
        setSelectedTemplate(newTemplate);
        setIncludeSkills(newIncludeSkills);
        setShowEmail(newShowEmail);
        setShowPhone(newShowPhone);
        setUseDescs(newUseDescs);
        setShowHistory(newShowHistory);
        setUseIntro(newUseIntro);
        if (!newResume) {
            try {
                const result = await API.post("api", "/resume", {
                    headers: {
                        Authorization: `Bearer ${(await Auth.currentSession())
                        .getAccessToken()
                        .getJwtToken()}`,
                    },
                    body: { resumeName: 'Default',
                            template: newTemplateName,
                            includeSkills: newIncludeSkills,
                            showEmail: newShowEmail,
                            showPhone: newShowPhone,
                            useDescs: newUseDescs,
                            showHistory: newShowHistory,
                            useIntro: newUseIntro }
                });
                if (result) {
                    const newResume = result.resume;
                    await updateUserData((prevUserData) => {
                        return {
                            ...prevUserData,
                            resumes: [newResume, ...prevUserData.resumes]
                        };
                    });      
                }
            }
            catch (error) {
                    alert(error);
            }
        }
        else {
            try {
                await API.put("api", `/resume/${newResume.resumeid}`, {
                    headers: {
                    Authorization: `Bearer ${(await Auth.currentSession())
                        .getAccessToken()
                        .getJwtToken()}`,
                    },
                    body: { resumeName: 'Default',
                            template: newTemplateName,
                            includeSkills: newIncludeSkills,
                            showEmail: newShowEmail,
                            showPhone: newShowPhone,
                            useDescs: newUseDescs,
                            showHistory: newShowHistory,
                            useIntro: newUseIntro }
                });
                await updateUserData((prevUserData) => {
                    return {
                        ...prevUserData,
                        resumes: prevUserData.resumes.map((resume) =>
                            resume.resumeid === newResume.resumeid ? { ...resume, resumename: 'Default', template: newTemplateName,
                                        includeskills: newIncludeSkills, showemail: newShowEmail, showphone: newShowPhone, usedescs: newUseDescs, showhistory: newShowHistory, useintro: newUseIntro } : resume
                        ),
                    };
                });
            }
            catch (error) {
                alert(error);
            }
        }
    };

    const handleDeleteClick = async (resumeId) => {
    try {
            await API.del("api", `/resume/${resumeId}`, {
                headers: {
                Authorization: `Bearer ${(await Auth.currentSession())
                    .getAccessToken()
                    .getJwtToken()}`,
                }
            });
                
            await updateUserData((prevUserData) => {
                return {
                    ...prevUserData,
                    resumes: prevUserData.resumes.filter(resume => resume.resumeid !== resumeId),
                };
            });  
        }
        catch (error) {
                alert(error);
        }
    };

    return (
        <>
            <div className="resume-wrapper">
                <div className="resume-document">
                    <div className="resume-page-heading">
                        <VscOpenPreview className="icon-xlarge icon-margin-right" />
                        <h2>Preview</h2>
                    </div>
                    <div id="resume-page" className="resume-page">
                        <Resume template={selectedTemplate}
                                showTemplate={showTemplate} />
                    </div>
                </div>
                <div className="resume-builder">
                    <div className="resume-page-heading">
                        <IoHammerOutline className="icon-xlarge icon-margin-right" />
                        <h2>Resume Builder</h2>
                    </div>
                    <div className="resume-panel">
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
                                    {/* <option value="">Select template...</option> */}
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
                                        <div key={item.introid} className="checkbox-row">
                                            <input type="checkbox"
                                                   className="checkbox-resume"
                                                   checked={true}
                                                   onChange={handleSelectIntro}
                                            />
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
                                                onClick={handleSaveClick} />
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
                                                            onClick={() => handleDeleteResume(resume)}/>
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
                        {isTipsOpen &&
                            <Tips tipIndex={selectedTipIndex}
                                  onClose={closeTips}
                                  position={position}
                            />}
                        {isDeleteDialogOpen && (
                            <Dialog
                                type="Warning"
                                heading="Confirm Delete Resume"
                                text="Are you sure you want to delete this resume?"
                                onCancel={handleCancelDelete}
                                onConfirm={handleConfirmDelete}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="resume-buttons">
                <IconButton iconType="back"
                            caption="Dashboard"
                            type="link"
                            linkTo="/"
                            size="normal"
                            onClick={null} />
            </div>
        </>
    );
}

export default ResumePage;