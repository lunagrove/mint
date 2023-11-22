import { editSkill } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    const skillId = event.pathParameters.skillId;

    const { description } = JSON.parse(event.body); 
    console.log('description', description);

    if (!userId || !skillId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const skill = await editSkill(userId, skillId, description);

    if (!skill) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to update skill record' })
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