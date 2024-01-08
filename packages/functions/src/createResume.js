import { createResume } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    
    const body = JSON.parse(event.body); 

    if (!userId || !body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const resume = await createResume(userId, body.resumeName, body.template, body.includeSkills, body.showEmail,
                                      body.showPhone, body.useDescs, body.showHistory, body.useIntro);

    if (!resume) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create resume record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ resume: resume}),
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