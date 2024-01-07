import { deleteRole, removeTag } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    const companyId = event.pathParameters.companyId;
    const roleId = event.pathParameters.roleId;

    if (!userId || !companyId || !roleId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const role = await deleteRole(userId, companyId, roleId);

    if (!role) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to delete role record' })
      };
    }

    const result = await removeTag(userId, roleId, 'role');

    if (!result.success) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to remove role from experience snippets', details: result.error })
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