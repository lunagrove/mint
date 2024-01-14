import React, { lazy, Suspense } from 'react';

const Resume = ({ template, includeSkills, showEmail, showPhone, useDescs, showHistory, useIntro }) => {

  const TemplateComponent = lazy(() => import(`../components/${template}`));

  return (
    <div className="resume-container">
      {!template ? (
        <h2 className="resume-no-template">You have no resume template selected!</h2>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <TemplateComponent includeSkills={includeSkills}
                             showEmail={showEmail}
                             showPhone={showPhone}
                             useDescs={useDescs}
                             showHistory={showHistory}
                             useIntro={useIntro} />
        </Suspense>
      )}
    </div>
  );
};

export default Resume;