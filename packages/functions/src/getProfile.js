import { getProfile } from "@mint/core/database";

export async function main(event) {

    try {
        const userId = event.requestContext.authorizer?.jwt.claims.sub;
        const profile = await getProfile(userId);

        if (!profile) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to retrieve user profile' })
        };
        }

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