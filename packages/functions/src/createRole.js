import { createRole } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    const companyId = event.pathParameters.companyId;
    
    const body = JSON.parse(event.body); 

    if (!userId || !companyId || !body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const role = await createRole(userId, companyId, body.description, body.fromdate, body.todate, body.current);

    if (!role) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create role record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ role: role }),
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