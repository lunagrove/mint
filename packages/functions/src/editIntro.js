import { editIntro } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    const introId = event.pathParameters.introId;

    const { statement } = JSON.parse(event.body); 

    if (!userId || !introId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const introStatement = await editIntro(userId, introId, statement);

    if (!introStatement) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to update introductory statement record' })
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