import { getSnippets, getExperienceSkills, getExperienceRoles, getExperienceHobbies,
         getExperienceProjects, getExperienceCourses, getExperienceCredentials } from "@mint/core/database";

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

        const experience = await Promise.all(
            snippets.map(async (snippet) => {
                const experienceId = snippet.experienceid;

                const expSkills = await getExperienceSkills(userId, experienceId);
                const expRoles = await getExperienceRoles(userId, experienceId); 
                const expHobbies = await getExperienceHobbies(userId, experienceId);
                const expProjects = await getExperienceProjects(userId, experienceId);
                const expCourses = await getExperienceCourses(userId, experienceId);
                const expCredentials = await getExperienceCredentials(userId, experienceId);

                const skills = expSkills.map(
                            ({ skillid, description }) => ({
                                id: skillid, description }));
                const roles = expRoles.map(
                            ({ roleid, description }) => ({
                                id: roleid, description }));
                const hobbies = expHobbies.map(
                            ({ hobbyid, description }) => ({
                                id: hobbyid, description }));
                const projects = expProjects.map(
                            ({ projectid, description }) => ({
                                id: projectid, description }));
                const courses = expCourses.map(
                            ({ courseid, description }) => ({
                                id: courseid, description }));
                const credentials = expCredentials.map(
                            ({ credentialid, description }) => ({
                                id: credentialid, description }));

                return {
                    experienceId: experienceId,
                    snippet: snippet.snippet,
                    createdOn: snippet.createdon,
                    skills,
                    roles,
                    hobbies,
                    projects,
                    courses,
                    credentials
                };
            })
        );
        
        return {
            statusCode: 200,
            body: JSON.stringify({ experience: experience }),
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'Internal server error' })
        };
    }
}