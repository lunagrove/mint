import { createProject } from "@mint/core/database";

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

    const project = await createProject(userId, body.description, body.snippet);

    if (!project) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create project record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ project: project}),
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