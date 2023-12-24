import { editRole } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    const companyId = event.pathParameters.companyId;
    const roleId = event.pathParameters.roleId;

    const body = JSON.parse(event.body); 

    if (!userId || !companyId || !roleId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const role = await editRole(userId, companyId, roleId, body.description, body.fromDate, body.toDate, body.current);

    if (!role) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to update role record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(role),
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