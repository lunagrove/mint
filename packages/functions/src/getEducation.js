import { getEducation, getCourses } from "@mint/core/database";

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
                const courses = await getCourses(userId, educationId);
                const details = courses.map(
                    ({ courseid, description, fromdate, todate, current, coursetype }) => {
                        const formattedFromDate = new Date(fromdate).toISOString().split('T')[0];
                        const formattedToDate = todate ? new Date(todate).toISOString().split('T')[0] : null;
                
                        return {
                            id: courseid,
                            description,
                            fromdate: formattedFromDate,
                            todate: formattedToDate,
                            current,
                            type: coursetype,
                      };
                    }
                  );
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