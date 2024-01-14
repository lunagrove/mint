import { useState, useEffect } from "react";
import { Auth, API } from "aws-amplify";
import IconButton from "../components/IconButton";
import Resume from "../components/Resume";
import ResumeBuilder from "../components/ResumeBuilder";
import { VscOpenPreview } from "react-icons/vsc";
import { IoHammerOutline } from "react-icons/io5";
import { useData } from '../utilities/DataContext';

const ResumePage = () => {

    const { userData, updateUserData } = useData();

    const [template, setTemplate] = useState('');
    const [showEmail, setShowEmail] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    const [useIntro, setUseIntro] = useState(false);
    const [includeSkills, setIncludeSkills] = useState(false);
    const [useDescs, setUseDescs] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [addedResume, setAddedResume] = useState(null);
    const [resumePageKey, setResumePageKey] = useState(0);

    useEffect(() => {
    //    console.log('userData: ', userData);
    }, [userData, resumePageKey]);

    const handleApplyClick = async (doUpdate, newResume, newTemplate, newTemplateName, newIncludeSkills, newShowEmail, newShowPhone, newUseDescs, newShowHistory, newUseIntro) => {
        setTemplate(newTemplate);
        setIncludeSkills(newIncludeSkills);
        setShowEmail(newShowEmail);
        setShowPhone(newShowPhone);
        setUseDescs(newUseDescs);
        setShowHistory(newShowHistory);
        setUseIntro(newUseIntro);
        if (doUpdate) {
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
        }
        else {
            setResumePageKey((prevKey) => prevKey + 1);
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
                        <Resume template={template}
                                includeSkills={includeSkills}
                                showEmail={showEmail}
                                showPhone={showPhone}
                                useDescs={useDescs}
                                showHistory={showHistory}
                                useIntro={useIntro} />
                    </div>
                </div>
                <div className="resume-builder">
                    <div className="resume-page-heading">
                        <IoHammerOutline className="icon-xlarge icon-margin-right" />
                        <h2>Resume Builder</h2>
                    </div>
                    <div className="resume-panel">
                        <ResumeBuilder onApply={handleApplyClick}
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