import { Api, Cognito } from "sst/constructs";

export function API({ stack }) {

  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
  });

  const api = new Api(stack, "api", {
    authorizers: {
      jwt: {
        type: "user_pool",
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: "jwt",
      function: {
        environment: {
          DATABASE_URL: process.env.DATABASE_URL,
        },
      },
    },
    routes: {
      "GET /snippets": "packages/functions/src/getSnippets.main",
      "GET /profile": "packages/functions/src/getProfile.main",
      "GET /skills": "packages/functions/src/getSkills.main",
      "GET /intro": "packages/functions/src/getIntro.main",
      "GET /education": "packages/functions/src/getEducation.main",
      "GET /companies": "packages/functions/src/getCompanies.main",
      "GET /hobbies": "packages/functions/src/getHobbies.main",
      "GET /projects": "packages/functions/src/getProjects.main",
      "POST /user": "packages/functions/src/createUser.main",
      "POST /intro": "packages/functions/src/createIntro.main",
      "POST /skill": "packages/functions/src/createSkill.main",
      "POST /education": "packages/functions/src/createEducation.main",
      "POST /company": "packages/functions/src/createCompany.main",
      "POST /hobby": "packages/functions/src/createHobby.main",
      "POST /project": "packages/functions/src/createProject.main",
      "POST /snippet": "packages/functions/src/createSnippet.main",
      "PUT /profile": "packages/functions/src/editProfile.main",
      "PUT /intro/{introId}": "packages/functions/src/editIntro.main",
      "PUT /skill/{skillId}": "packages/functions/src/editSkill.main",
      "PUT /education/{educationId}": "packages/functions/src/editEducation.main",
      "PUT /credential/{educationId}/{credentialId}": "packages/functions/src/editCredential.main",
      "PUT /course/{educationId}/{courseId}": "packages/functions/src/editCourse.main",
      "PUT /company/{companyId}": "packages/functions/src/editCompany.main",
      "PUT /role/{companyId}/{roleId}": "packages/functions/src/editRole.main",
      "PUT /hobby/{hobbyId}": "packages/functions/src/editHobby.main",
      "PUT /project/{projectId}": "packages/functions/src/editProject.main",
      "PUT /snippet/{snippetId}": "packages/functions/src/editSnippet.main",
      "DELETE /intro/{introId}": "packages/functions/src/deleteIntro.main",
      "DELETE /skill/{skillId}": "packages/functions/src/deleteSkill.main",
      "DELETE /education/{educationId}": "packages/functions/src/deleteEducation.main",
      "DELETE /company/{companyId}": "packages/functions/src/deleteCompany.main",
      "DELETE /hobby/{hobbyId}": "packages/functions/src/deleteHobby.main",
      "DELETE /project/{projectId}": "packages/functions/src/deleteProject.main",
      "DELETE /snippet/{snippetId}": "packages/functions/src/deleteSnippet.main",
      "DELETE /role/{companyId}/{roleId}": "packages/functions/src/deleteRole.main",
      "DELETE /credential/{educationId}/{credentialId}": "packages/functions/src/deleteCredential.main",
      "DELETE /course/{educationId}/{courseId}": "packages/functions/src/deleteCourse.main"
    },
  });

  // Allow authenticated users invoke API
  auth.attachPermissionsForAuthUsers(stack, [api]);

  stack.addOutputs({
    ApiEndpoint: api.url,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId ?? "",
    UserPoolClientId: auth.userPoolClientId,
  });

  return {
    api, auth
  };
}
