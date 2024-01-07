import { deleteSkill, removeSkillTag } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    const skillId = event.pathParameters.skillId;

    if (!userId || !skillId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const skill = await deleteSkill(userId, skillId);

    if (!skill) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to delete skill record' })
      };
    }

    const result = await removeSkillTag(userId, skillId);

    if (!result.success) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to remove skill from experience snippets', details: result.error })
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