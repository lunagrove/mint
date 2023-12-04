import { createCompany } from "@mint/core/database";

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

    const company = await createCompany(userId, body.companyName, body.description);

    if (!company) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create company record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ companyId: company.companyid,
                             companyName: company.companyname, 
                             description: company.description,
                             details: []}),
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