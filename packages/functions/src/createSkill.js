import { createSkill } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    
    const { description } = JSON.parse(event.body); 

    if (!userId || !description) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const skill = await createSkill(userId, description);

    if (!skill) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create skill record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ skill: skill }),
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