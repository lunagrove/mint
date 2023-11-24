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
      "POST /user": "packages/functions/src/createUser.main",
      "PUT /profile": "packages/functions/src/editProfile.main",
      "POST /skill": "packages/functions/src/createSkill.main",
      "PUT /skill/{skillId}": "packages/functions/src/editSkill.main",
      "DELETE /skill/{skillId}": "packages/functions/src/deleteSkill.main",
      "POST /intro": "packages/functions/src/createIntro.main",
      "PUT /intro/{introId}": "packages/functions/src/editIntro.main",
      "DELETE /intro/{introId}": "packages/functions/src/deleteIntro.main"
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
