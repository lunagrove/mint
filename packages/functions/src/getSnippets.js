import { getSnippets } from "@mint/core/database";

export async function main(event) {

    try {
        const userId = event.requestContext.authorizer?.jwt.claims.sub;
        const snippets = await getSnippets(userId);

        if (!snippets) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to retrieve snippets' })
        };
        }

        return {
        statusCode: 200,
        body: JSON.stringify({ snippets: snippets }),
        }
    } catch (error) {
        console.error(error);
        return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message || 'Internal server error' })
        };
    }
}