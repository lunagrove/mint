import { getProfile } from "@mint/core/database";

export async function main(event, context) {

    try {
        const userId = event.requestContext.authorizer?.jwt.claims.sub;

        if (!userId) {
            return {
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Failed to retrieve user profile' })
                };
        }

        const profile = await getProfile(userId);

        return {
            statusCode: 200,
            body: JSON.stringify({ profile: profile }),
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'Internal server error' })
        };
    }

}