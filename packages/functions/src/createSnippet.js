import { createSnippet, createExperienceSkill, createExperienceRole, createExperienceHobby,
         createExperienceProject, createExperienceCourse, createExperienceCredential } from "@mint/core/database";

export async function main(event) {
  
  try {

    const userId = event.requestContext.authorizer?.jwt.claims.sub;
    
    const body = JSON.parse(event.body); 

    if (!userId || !body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing or invalid parameters' })
      };
    }

    const snippet = await createSnippet(userId, body.snippet);

    if (!snippet) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create experience record' })
      };
    }

    let expSkills = [];
    if (body.skills && body.skills.length > 0) {
      for (const skill of body.skills) {
        const expSkill = await createExperienceSkill(userId, snippet.experienceid, skill.value); 
        if (expSkill) {
          expSkills.push(expSkill);
        } 
      };
    };

    let expRoles = [];
    let expCourses = [];
    let expHobbies = [];
    let expProjects = [];
    let expCredentials = [];

    console.log('body.role', body.role);

    if (body.role) {
      const expRole = await createExperienceRole(userId, snippet.experienceid, body.role.value);
      if (expRole) {
        expRoles.push(expRole);
      } 
    } 
    if (body.hobby) {
      const expHobby = await createExperienceHobby(userId, snippet.experienceid, body.hobby.value);
      if (expHobby) {
        expHobbies.push(expHobby);
      } 
    }  
    if (body.project) {
      const expProject = await createExperienceProject(userId, snippet.experienceid, body.project.value);
      if (expProject) {
        expProjects.push(expProject);
      } 
    }  
    if (body.course) {
      const expCourse = await createExperienceCourse(userId, snippet.experienceid, body.course.value);
      if (expCourse) {
        expCourses.push(expCourse);
      } 
    }   
    if (body.credential) {
      const expCredential = await createExperienceCredential(userId, snippet.experienceid, body.credential.value);
      if (expCredential) {
        expCredentials.push(expCredential);
      } 
    } 

    const newSnippet = {experienceId: snippet.experienceId,
                        snippet: snippet.snippet,
                        createdOn: snippet.createdon,
                        expSkills,
                        expRoles,
                        expHobbies,
                        expProjects,
                        expCourses,
                        expCredentials};

    return {
      statusCode: 200,
      body: JSON.stringify({ snippet: newSnippet }),
    }
  } catch (error) {
    // Error handling logic
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal server error' })
    };
  }
}