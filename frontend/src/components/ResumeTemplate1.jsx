import React from 'react';
import '../styles/ResumeTemplate1.css';
import { useData } from '../utilities/DataContext';
import { PiArrowElbowDownRightFill } from "react-icons/pi";

const ResumeTemplate1 = ({ showTemplate }) => {

  const { userData, updateUserData } = useData();

  return (
    <>
      {showTemplate ? (
        <div className="t1-template-container">
          <div className="t1-resume-user">
            <div>
              <h2>{userData.profile.firstname} {userData.profile.lastname}</h2>
            </div>
            <div>
              <h3>{userData.currentResume.showEmail ? userData.profile.emailaddress : ''}</h3>
              <h3>{userData.currentResume.showPhone ? userData.profile.phonenumber : ''}</h3>
              <h3>{userData.profile.linkedin ? userData.profile.linkedin : ''}</h3>
              <h3>{userData.profile.website ? userData.profile.website : ''}</h3>
            </div>
          </div>
          <h3 className="t1-resume-heading">[Intro Statements]</h3>
          <hr></hr>
          <div className="t1-resume-information">
            <div className="t1-resume-details">
              <h3 className="t1-resume-heading">Work Experience</h3>
              <h3>[Company Name]</h3>
              <div className="t1-resume-role">
                <PiArrowElbowDownRightFill className="icon-xlarge icon-margin-left icon-negative-margin-top" />
                <h3>[Role]</h3>
              </div>
              <div className="t1-resume-role">
                <PiArrowElbowDownRightFill className="icon-xlarge icon-margin-left icon-negative-margin-top icon-color-white" />
                <h3>[Experience Snippets]</h3>
              </div>
              <hr></hr>
              <h3 className="t1-resume-heading">Education</h3>
              <h3>[Institution Name]</h3>
              <div className="t1-resume-course">
                <PiArrowElbowDownRightFill className="icon-xlarge icon-margin-left icon-negative-margin-top" />
                <h3>[Credential]</h3>
              </div>
              <div className="t1-resume-course">
                <PiArrowElbowDownRightFill className="icon-xlarge icon-margin-left icon-negative-margin-top icon-color-white" />
                <h3>[Experience Snippets]</h3>
              </div>
              <hr></hr>
              <h3 className="t1-resume-heading">Other Experience</h3>
              <h3>[Project]</h3>
              <h3>[Project Description]</h3>
              <div className="t1-resume-other">
                <PiArrowElbowDownRightFill className="icon-xlarge icon-margin-left icon-negative-margin-top" />
                <h3>[Experience Snippets]</h3>
              </div>
              <h3>[Hobby/Club]</h3>
              <h3>[Hobby/Club Description]</h3>
              <div className="t1-resume-other">
                <PiArrowElbowDownRightFill className="icon-xlarge icon-margin-left icon-negative-margin-top" />
                <h3>[Experience Snippets]</h3>
              </div>
            </div>
            <div className="t1-resume-skills">
                <h3 className="t1-resume-heading">[Skills]</h3>
            </div>
          </div>
          <hr></hr>
        </div>
      ) : (
        <div className="t1-template-container">
          <div className="t1-resume-user">
            <div>
              {!userData.profile.lastname &&
                <h3 className="t1-resume-heading">[Name]</h3>}
              <h2>{userData.profile.firstname} {userData.profile.lastname}</h2>
            </div>
            <div>
              {!userData.currentResume.showEmail && !userData.currentResume.showPhone &&
              !userData.profile.linkedin && !userData.profile.website &&
                <h3 className="t1-resume-heading">[Profile]</h3>}
              <h3>{userData.currentResume.showEmail ? userData.profile.emailaddress : ''}</h3>
              <h3>{userData.currentResume.showPhone ? userData.profile.phonenumber : ''}</h3>
              <h3>{userData.profile.linkedin ? userData.profile.linkedin : ''}</h3>
              <h3>{userData.profile.website ? userData.profile.website : ''}</h3>
            </div>
          </div>
          {!userData.currentResume.useIntro || (userData.currentResume.useIntro && userData.currentResume.intro.length === 0) && <h3 className="t1-resume-heading">[Intro Statements]</h3>}
          {userData.currentResume.useIntro && userData.currentResume.intro.length > 0 ? (
              <div>
                {userData.currentResume.intro.map((item) => (
                  <div key={item.introid} className="t1-intro-statement">
                    {item.snippet}
                  </div>
                ))}
              </div>
          ) : null}
          <hr></hr>
          <div className="t1-resume-information">
            <div className="t1-resume-details">
              <h3 className="t1-resume-heading">[Work Experience]</h3>
              <div>

              </div>
              <hr></hr>
              <h3 className="t1-resume-heading">[Education]</h3>
              <div>

              </div>
              <hr></hr>
              <h3 className="t1-resume-heading">[Other Experience]</h3>
              <div>
              </div>
            </div>
            {userData.currentResume.includeSkills && 
              <div className="t1-resume-skills">
                {userData.currentResume.includeSkills && userData.currentResume.skills.length === 0 &&
                  <h3 className="t1-resume-heading">[Skills]</h3>}
                {userData.currentResume.includeSkills && userData.currentResume.skills.length > 0 ? (
                  <div>
                    <h3>Skills</h3>
                    <ul>
                      {userData.currentResume.skills.map((item) => (
                        <li className="t1-resume-skill-item" key={item.value}>{item.label}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            }
          </div>
          <hr></hr>
        </div>
      )}
    </>
  );
};

export default ResumeTemplate1;