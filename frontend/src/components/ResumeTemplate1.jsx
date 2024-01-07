import React from 'react';
import '../styles/ResumeTemplate1.css';
import { useData } from '../utilities/DataContext';

const ResumeTemplate1 = ({ showemail, showphone, showintro }) => {

  const { userData, updateUserData } = useData();

  return (
    <div className="t1-template-container">
        <h3 className="t1-resume-heading">[Profile]</h3>
        <div className="t1-resume-user">
          <div>
            <h2>{userData.profile.firstname} {userData.profile.lastname}</h2>
            {console.log('showIntro', showintro)}
            {showintro && userData.intro.length > 0 ? (
              <div>
                {userData.intro.map((item) => (
                  <div key={item.introid} className="t1-intro-statement">
                    {item.snippet}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <h3>{showemail ? userData.profile.emailaddress : ''}</h3>
            <h3>{showphone ? userData.profile.phonenumber : ''}</h3>
            <h3>{userData.profile.linkedin ? userData.profile.linkedin : ''}</h3>
            <h3>{userData.profile.website ? userData.profile.website : ''}</h3>
          </div>
        </div>
        <hr></hr>
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
        <hr></hr>
    </div>
  );
};

export default ResumeTemplate1;