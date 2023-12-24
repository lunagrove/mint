import { editCredential } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    const educationId = event.pathParameters.educationId;
    const credentialId = event.pathParameters.credentialId;

    const body = JSON.parse(event.body); 

    if (!userId || !educationId || !credentialId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const credential = await editCredential(userId, educationId, credentialId, body.description, body.fromDate, body.toDate, body.current);

    if (!credential) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to update credential record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(role),
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