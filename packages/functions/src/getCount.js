import { getClickCount } from "@mint/core/database";

export async function main(event) {

  try {

    const clickCount = await getClickCount();

    if (!clickCount) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to retrieve click count' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ clickCount: clickCount }),
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal server error' })
    };
  }
};
