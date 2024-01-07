import React from 'react';
import '../styles/ResumeTemplate2.css';

const ResumeTemplate2 = ({ showemail, showphone, showintro }) => {

  return (
    <>
        <h1 className="t2-resume-heading">Your Document Title 2</h1>
        <p className="t2-resume-paragraph">This is the content of your document 2.</p>
        <ul>
            <li>Item 4</li>
            <li>Item 5</li>
            <li>Item 6</li>
            <li>{userinfo.firstname} {userinfo.lastname}</li>
        </ul>
    </>
  );
};

export default ResumeTemplate2;