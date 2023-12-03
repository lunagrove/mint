import { getCompanies } from "@mint/core/database";

export async function main(event, context) {

    try {
        const userId = event.requestContext.authorizer?.jwt.claims.sub;

        if (!userId) {
            return {
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Failed to retrieve company records' })
                };
        }
        
        const allCompanies = await getCompanies(userId);

        const companies = await Promise.all(
            allCompanies.map(async (company) => {
                const companyId = company.companyid;
                const roles = await getRoles(userId, companyId);

                const roleDetails = roles.map(
                            ({ roleid, description, fromdate, todate, current }) => ({
                                 id: roleid, description, fromdate, todate, current }));
                

                const details = [...roleDetails];

                return {
                    companyId: company.educationid,
                    companyName: company.name, 
                    description: company.description,
                    details,
                };
            })
        );  

        return {
            statusCode: 200,
            body: JSON.stringify({ companies: companies }),
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'Internal server error' })
        };
    }
}