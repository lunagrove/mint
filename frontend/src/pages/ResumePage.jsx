import { useState, useEffect } from "react";
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
    const [showIntro, setShowIntro] = useState(false);

    useEffect(() => {
        console.log('template: ', template);
        console.log('userData: ', userData);
    }, [template, showEmail, showPhone]);

    const handleApplyClick = (newTemplate, newShowEmail, newShowPhone, newShowIntro) => {
        setTemplate(newTemplate);
        setShowEmail(newShowEmail);
        setShowPhone(newShowPhone);
        setShowIntro(newShowIntro);
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
                                showIntro={showIntro} />
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