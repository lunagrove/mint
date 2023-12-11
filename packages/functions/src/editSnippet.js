import { editSnippet } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    const snippetId = event.pathParameters.snippetId;

    const body = JSON.parse(event.body); 

    if (!userId || !snippetId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const snippet = await editSnippet(userId, snippetId, body.description);

    if (!snippet) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to update experience record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(snippet),
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