import React from 'react';
import '../styles/ResumeTemplate1.css';
import { useData } from '../utilities/DataContext';

const ResumeTemplate1 = () => {

  const { userData, updateUserData } = useData();

  return (
    <div className="t1-template-container">
        <h3 className="t1-resume-heading">[Profile]</h3>
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
        {userData.currentResume.useIntro && <h3 className="t1-resume-heading">[Intro Statements]</h3>}
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
              <h3 className="t1-resume-heading">[Skills]</h3>
              {userData.currentResume.includeSkills && userData.currentResume.skills.length > 0 ? (
                userData.currentResume.skills.map((item) => (
                  <li className="t1-resume-skill-item" key={item.value}>{item.label}</li>
                )) 
              ) : null}
            </div>
          }
        </div>
        <hr></hr>
    </div>
  );
};

export default ResumeTemplate1;