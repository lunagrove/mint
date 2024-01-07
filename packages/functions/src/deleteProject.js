import { deleteProject, removeTag } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    const projectId = event.pathParameters.projectId;

    if (!userId || !projectId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const project = await deleteProject(userId, projectId);

    if (!project) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to delete project record' })
      };
    }

    const result = await removeTag(userId, projectId, 'project');

    if (!result.success) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to remove project from experience snippets', details: result.error })
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