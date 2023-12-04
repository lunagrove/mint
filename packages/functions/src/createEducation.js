import { createEducation } from "@mint/core/database";

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

    const education = await createEducation(userId, body.institution, body.location);

    if (!education) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create education record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ educationId: education.educationid,
                             institution: education.institution, 
                             location: education.location,
                             details: []}),
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