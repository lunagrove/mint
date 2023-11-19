import { editProfile } from "@mint/core/database";

export async function main(event, context) {

    try {
        const userId = event.requestContext.authorizer?.jwt.claims.sub;
        const request = JSON.parse(event.body);
        const profile = request.newProfile;

        if (!userId) {
            return {
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Failed to update user profile' })
                };
        }

        const user = await editProfile(userId, profile.firstname, profile.lastname, profile.phonenumber,
                                       profile.location, profile.linkedin, profile.website);
        return {
            statusCode: 200,
            body: JSON.stringify(user),
        }

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'Internal server error' })
        };
    }

}