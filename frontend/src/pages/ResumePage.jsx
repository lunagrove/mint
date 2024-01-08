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

    useEffect(() => {
        console.log('userData: ', userData);
    }, [userData]); 

    useEffect(() => {
    }, [template, showEmail, showPhone, useIntro]);

    const handleApplyClick = async (resumeId, newTemplate, newTemplateName, newShowEmail, newShowPhone, newUseIntro) => {
        setTemplate(newTemplate);
        setShowEmail(newShowEmail);
        setShowPhone(newShowPhone);
        setUseIntro(newUseIntro);
        if (!resumeId) {
            try {
                const result = await API.post("api", "/resume", {
                    headers: {
                        Authorization: `Bearer ${(await Auth.currentSession())
                        .getAccessToken()
                        .getJwtToken()}`,
                    },
                    body: { resumeName: 'Default',
                            template: newTemplateName,
                            includeSkills: false,
                            showEmail: newShowEmail,
                            showPhone: newShowPhone,
                            useDescs: false,
                            showHistory: false,
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
                await API.put("api", `/resume/${resumeId}`, {
                    headers: {
                    Authorization: `Bearer ${(await Auth.currentSession())
                        .getAccessToken()
                        .getJwtToken()}`,
                    },
                    body: { resumeName: 'Default',
                            template: newTemplateName,
                            includeSkills: false,
                            showEmail: newShowEmail,
                            showPhone: newShowPhone,
                            useDescs: false,
                            showHistory: false,
                            useIntro: newUseIntro }
                });
                await updateUserData((prevUserData) => {
                    return {
                        ...prevUserData,
                        resumes: prevUserData.resumes.map((resume) =>
                            resume.resumeid === resumeId ? { ...resume, resumeName: '', template: snippet,
                                        includeSkills: false, showEmail: newShowEmail, showPhone: newShowPhone,
                                        useDescs: false, showHistory: false, useIntro: newUseIntro } : resume
                        ),
                    };
                });
            }
            catch (error) {
                  alert(error);
            }
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
                                showEmail={showEmail}
                                showPhone={showPhone}
                                useIntro={useIntro} />
                    </div>
                </div>
                <div className="resume-builder">
                    <div className="resume-page-heading">
                        <IoHammerOutline className="icon-xlarge icon-margin-right" />
                        <h2>Resume Builder</h2>
                    </div>
                    <div className="resume-panel">
                        <ResumeBuilder onApply={handleApplyClick} />
                        
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