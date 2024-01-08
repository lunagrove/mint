import React, { lazy, Suspense } from 'react';

const Resume = ({ template, showEmail, showPhone, useIntro }) => {

  const TemplateComponent = lazy(() => import(`../components/${template}`));

  return (
    <div className="resume-container">
      {!template ? (
        <h2 className="resume-no-template">You have no resume template selected!</h2>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <TemplateComponent showemail={showEmail}
                             showphone={showPhone}
                             useintro={useIntro} />
        </Suspense>
      )}
    </div>
  );
};

export default Resume;