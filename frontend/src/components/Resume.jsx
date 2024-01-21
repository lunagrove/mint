import React, { lazy, Suspense } from 'react';

const Resume = ({ template, showTemplate }) => {

  const TemplateComponent = lazy(() => import(`../components/${template}`));

  return (
    <div className="resume-container">
      {!template ? (
        <h2 className="resume-no-template">You have no resume template selected!</h2>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <TemplateComponent showTemplate={showTemplate} />
        </Suspense>
      )}
    </div>
  );
};

export default Resume;