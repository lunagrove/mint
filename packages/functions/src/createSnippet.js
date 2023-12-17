import { createSnippet } from "@mint/core/database";

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

    const snippet = await createSnippet(userId, body.snippet);

    if (!snippet) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create experience record' })
      };
    }

    if (body.skills && body.skills.length > 0) {
      
    }

    if (body.tags && body.tags.length > 0) {
        
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ snippet: snippet}),
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