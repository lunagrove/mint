import { useState, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import IconButton from "../components/IconButton";
import Resume from "../components/Resume";
import ResumeBuilder from "../components/ResumeBuilder";
import { VscOpenPreview } from "react-icons/vsc";
import { IoHammerOutline } from "react-icons/io5";
import { useData } from '../utilities/DataContext';
import { fetchSnippets, fetchProfile, fetchIntro, fetchSkills, fetchEducation, fetchCompanies,
    fetchHobbies, fetchProjects } from "../utilities/fetchData";

const ResumePage = () => {

    const {user} = useAuthenticator((context) => [context.user]);
    const { userData, updateUserData } = useData();

    const [template, setTemplate] = useState('');
    const [showEmail, setShowEmail] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    const [useIntro, setUseIntro] = useState(false);
    const [includeSkills, setIncludeSkills] = useState(false);
    const [useDescs, setUseDescs] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [addedResume, setAddedResume] = useState(null);

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
        const currentResume = { 
            template: '',
            includeSkills: true,
            showEmail: true,
            showPhone: true,
            useDescs: false,
            showHistory: false,
            useIntro: true,
            skills: [],
            intro: [] }
        userData.currentResume = currentResume;
    }, []);

    useEffect(() => {
        console.log('userData: ', userData);
    }, [userData]);

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
    };

    const handleUpdateData = (dataType, newData) => {
        updateUserData((prevUserData) => ({
            ...prevUserData,
            [dataType]: newData       
        }));
    };

    const handleApplyClick = async (newResume, newTemplate, newTemplateName, newIncludeSkills, newShowEmail, newShowPhone, newUseDescs, newShowHistory, newUseIntro, selectedSkills) => {
        setTemplate(newTemplate);
        setIncludeSkills(newIncludeSkills);
        setShowEmail(newShowEmail);
        setShowPhone(newShowPhone);
        setUseDescs(newUseDescs);
        setShowHistory(newShowHistory);
        setUseIntro(newUseIntro);
        setSelectedSkills(selectedSkills);
        if (!newResume) {
            const currentResume = { 
                    template: newTemplateName,
                    includeSkills: newIncludeSkills,
                    showEmail: newShowEmail,
                    showPhone: newShowPhone,
                    useDescs: newUseDescs,
                    showHistory: newShowHistory,
                    useIntro: newUseIntro,
                    skills: newIncludeSkills ? selectedSkills : [],
                    intro: newUseIntro ? userData.intro : [] }
            setAddedResume(newResume);
            await updateUserData((prevUserData) => {
                return {
                    ...prevUserData,
                    currentResume
                };
            });      
        }
        else {
            setAddedResume(newResume);
        }
    };

    const handleSaveClick = async (newResume, newTemplate, newTemplateName, newIncludeSkills, newShowEmail, newShowPhone, newUseDescs, newShowHistory, newUseIntro) => {
        setTemplate(newTemplate);
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
                    setAddedResume(newResume);
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
            setAddedResume(newResume);
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
                        <Resume template={template} />
                    </div>
                </div>
                <div className="resume-builder">
                    <div className="resume-page-heading">
                        <IoHammerOutline className="icon-xlarge icon-margin-right" />
                        <h2>Resume Builder</h2>
                    </div>
                    <div className="resume-panel">
                        <ResumeBuilder onApply={handleApplyClick}
                                       onSave={handleSaveClick}
                                       onDelete={handleDeleteClick}
                                       resume={addedResume} />
                        
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