import { editCourse } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    const educationId = event.pathParameters.educationId;
    const courseId = event.pathParameters.courseId;

    const body = JSON.parse(event.body); 

    if (!userId || !educationId || !courseId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const course = await editCourse(userId, educationId, courseId, body.description, body.fromDate, body.toDate, body.current);

    if (!course) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to update course record' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(course),
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