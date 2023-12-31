import { deleteCompany } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    const companyId = event.pathParameters.companyId;

    if (!userId || !companyId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const company = await deleteCompany(userId, companyId);

    if (!company) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to delete company record' })
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