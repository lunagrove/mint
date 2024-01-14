import React from 'react';
import '../styles/ResumeTemplate2.css';
import { useData } from '../utilities/DataContext';

const ResumeTemplate2 = ({ includeSkills, showEmail, showPhone, useDescs, showHistory, useIntro }) => {

  const { userData, updateUserData } = useData();

  return (
    <>
        <h1 className="t2-resume-heading">Your Document Title 2</h1>
        <p className="t2-resume-paragraph">This is the content of your document 2.</p>
        <ul>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
            <li>{userData.profile.firstname} {userData.profile.lastname}</li>
        </ul>
    </>
  );
};

export default ResumeTemplate2;