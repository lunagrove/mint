import { deleteHobby, removeTag } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    const hobbyId = event.pathParameters.hobbyId;

    if (!userId || !hobbyId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const hobby = await deleteHobby(userId, hobbyId);

    if (!hobby) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to delete hobby record' })
      };
    }

    const result = await removeTag(userId, hobbyId, 'hobby');

    if (!result.success) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to remove hobby from experience snippets', details: result.error })
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