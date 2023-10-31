import { editClickCount } from "@mint/core/database";

export async function main(event) {

  try {

    const clickCount = await editClickCount();

    if (!clickCount) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to update click count' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ clickCount: clickCount }),
    }
  } catch (error) {
    // Error handling logic
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal server error' })
    };
  };

};
