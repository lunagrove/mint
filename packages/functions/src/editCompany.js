import { editCompany } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    const companyId = event.pathParameters.companyId;

    const { body } = JSON.parse(event.body); 

    if (!userId || !companyId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const company = await editCompany(userId, companyId, body.companyName, body.description);

    if (!company) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to update company record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(company),
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