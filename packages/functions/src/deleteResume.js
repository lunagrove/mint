import { deleteResume } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    const resumeId = event.pathParameters.resumeId;

    if (!userId || !resumeId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const resume = await deleteResume(userId, resumeId);

    if (!resume) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to delete resume record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({}),
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