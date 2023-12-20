import axios from 'axios';
import * as msal from "@azure/msal-node";
const {MS_APP_ID,MS_APP_SECRET,TENANT_ID,DATAVERSE_DOMAIN, DATAVERSE_VERSION} = process.env;

const clientConfig = {
    auth: {
        clientId: MS_APP_ID,
        clientSecret: MS_APP_SECRET,
        authority: `https://login.microsoftonline.com/${TENANT_ID}`
    }
};
const cca = new msal.ConfidentialClientApplication(clientConfig);
 
export default async (req, res)=>{
    const value = req.body;
    let {accessToken} = await cca.acquireTokenByClientCredential({
        scopes: [`https://${ DATAVERSE_DOMAIN}/.default`],
        skipCache: true
    });
                    
    const relatedEntities =  {
      entityType: "crb5c_fow_customerid",
      id: value.clientId,    
    }

    console.log('related entities :',relatedEntities)

    var manyToManyAssociateRequest = {
    getMetadata: () => ({
        boundParameter: null,
        parameterTypes: {},
        operationType: 1,
        operationName: "Associate"
    }),
    relationship: "crb5c_parent_activity_bridge",

    target: {
        entityType: "crb5c_fow_session_schedule",
        id: value.schedulerId
    },
    relatedEntities
    }

    try {
        const response = await axios.post("https://orga7b5e99e.crm5.dynamics.com//api/data/v9.2/AssociateEntities", manyToManyAssociateRequest, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: 'Bearer '+ accessToken,
            }
        });

        console.log("RESULT OF ADDING CLIENT", response.data);
    } catch (error) {

        console.error("ERROR Adding bridge table", error);
    }

    res.json(response.data)
}