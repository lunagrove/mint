import { deleteCourse, removeTag } from "@mint/core/database";

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

    const course = await deleteCourse(userId, educationId, courseId);

    if (!course) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to delete course record' })
      };
    }

    const result = await removeTag(userId, courseId, body.type);

    if (!result.success) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: `Failed to remove ${body.type} from experience snippets`, details: result.error })
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