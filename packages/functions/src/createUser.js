import { createUser } from "@mint/core/database";

export async function main(event) {
  
  try {

    const body = JSON.parse(event.body);

    console.log('event.body', body);

    if (!body.email || !body.userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const user = await createUser(body.userId, body.email);

    if (!user) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create user record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ user: user }),
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