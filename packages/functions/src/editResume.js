import { editResume } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    const resumeId = event.pathParameters.resumeId;

    const body = JSON.parse(event.body); 

    if (!userId || !resumeId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const resume = await editResume(userId, resumeId, body.resumeName, body.template, body.includeSkills,
                                    body.showEmail, body.showPhone, body.useDescs, body.showHistory, body.useIntro);

    if (!hobby) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to update resume record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(resume),
    }
  } catch (error) {
    // Error handling logic
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal server error' })
    };
  }
}