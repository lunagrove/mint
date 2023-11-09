import { createEmail } from "@mint/core/database";

export async function main(event) {

  const sub = event.requestContext.authorizer?.jwt.claims.sub;
  const username = event.requestContext.authorizer?.jwt.claims.username;
  
  try {

    const body = JSON.parse(event.body);

    if (!body.email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const contact = await createEmail(body.email, body.firstName, body.lastName);

    if (!contact) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create email contact record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ contact: contact }),
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