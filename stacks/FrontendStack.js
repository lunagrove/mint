import { StaticSite, use } from "sst/constructs";
import { API } from "./ApiStack";

export function FrontendStack({ stack, app }) {
  const { api, auth } = use(API);

  const site = new StaticSite(stack, "ReactSite", {
    path: "frontend",
    buildOutput: "dist",
    buildCommand: "npm run build",
    // Pass in our environment variables
    environment: {
      VITE_APP_API_URL: api.customDomainUrl || api.url,
      VITE_APP_REGION: app.region,
      VITE_APP_USER_POOL_ID: auth.userPoolId,
      VITE_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      VITE_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId ?? "",
    },
  });

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.url || "",
  });
}
