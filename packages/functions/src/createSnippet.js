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
    let expHobbies = [];
    let expProjects = [];
    let expCourses = [];
    let expCredentials = [];
    if (body.tags && body.tags.length > 0) {
      for (const tag of body.tags) {
        const parts = tag.value.split('+');
        const id = parts[0];
        const type = parts[1];
        if (type === "role") {
          const expRole = await createExperienceRole(userId, snippet.experienceid, id);
          if (expRole) {
            expRoles.push(expRole);
          } 
        } 
        if (type === "hobby") {
          const expHobby = await createExperienceHobby(userId, snippet.experienceid, id);
          if (expHobby) {
            expHobbies.push(expHobby);
          } 
        }  
        if (type === "project") {
          const expProject = await createExperienceProject(userId, snippet.experienceid, id);
          if (expProject) {
            expProjects.push(expProject);
          } 
        }  
        if (type === "course") {
          const expCourse = await createExperienceCourse(userId, snippet.experienceid, id);
          if (expCourse) {
            expCourses.push(expCourse);
          } 
        }   
        if (type === "credential") {
          const expCredential = await createExperienceCredential(userId, snippet.experienceid, id);
          if (expCredential) {
            expCredentials.push(expCredential);
          } 
        } 
      };      
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