import { createHobby } from "@mint/core/database";

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

    const hobby = await createHobby(userId, body.desription, body.snippet);

    if (!hobby) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create hobby record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ hobby: hobby}),
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