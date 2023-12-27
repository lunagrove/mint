import { createCourse } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    const educationId = event.pathParameters.educationId;
    
    const body = JSON.parse(event.body); 

    if (!userId || !educationId || !body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const course = await createCourse(userId, educationId, body.description, body.fromdate, body.todate, body.current, body.type);

    if (!course) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create course record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ course: course }),
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