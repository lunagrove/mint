import { createIntro } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    
    const { statement } = JSON.parse(event.body); 

    if (!userId || !statement) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const introStatement = await createIntro(userId, statement);

    if (!introStatement) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create introductory statement record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ statement: introStatement }),
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