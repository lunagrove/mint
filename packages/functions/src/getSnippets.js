import { getSnippets } from "@mint/core/database";

export async function main(event, context) {

    try {
        const userId = event.requestContext.authorizer?.jwt.claims.sub;

        if (!userId) {
            return {
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Failed to retrieve snippets' })
                };
        }
        
        const snippets = await getSnippets(userId);

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