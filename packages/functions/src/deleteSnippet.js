import { deleteSnippet } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    const snippetId = event.pathParameters.snippetId;

    if (!userId || !snippetId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const snippet = await deleteSnippet(userId, snippetId);

    if (!snippet) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to delete experience record' })
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