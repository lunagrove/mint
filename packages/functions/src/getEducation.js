import { getEducation, getCredentials, getCourses } from "@mint/core/database";

export async function main(event, context) {

    try {
        const userId = event.requestContext.authorizer?.jwt.claims.sub;

        if (!userId) {
            return {
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Failed to retrieve education records' })
                };
        }
        
        const institutions = await getEducation(userId);

        const education = await Promise.all(
            institutions.map(async (institution) => {
                const educationId = institution.educationid;
                const credentials = await getCredentials(userId, educationId);
                const courses = await getCourses(userId, educationId);

                const credentialDetails = credentials.map(
                            ({ credentialid, description, fromdate, todate, current }) => ({
                                 id: credentialid, type: "credential", description, fromdate, todate, current }));
                const courseDetails = courses.map(
                            ({ courseid, description, fromdate, todate, current }) => ({
                                 id: courseid, type: "course", description, fromdate, todate, current }));

                const details = [...credentialDetails, ...courseDetails];

                return {
                    educationId: institution.educationid,
                    institution: institution.institution, 
                    location: institution.location,
                    details,
                };
            })
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ education: education }),
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'Internal server error' })
        };
    }
}