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
    let {accessToken} = await cca.acquireTokenByClientCredential({
        scopes: [`https://${ DATAVERSE_DOMAIN}/.default`],
        skipCache: true
    });
    const baseURL = `https://${DATAVERSE_DOMAIN}/api/data/${DATAVERSE_VERSION}/`;
    let $ = axios.create({
        baseURL,
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'OData-MaxVersion': '4.0',
            'OData-Version': '4.0',
            'Authorization':'Bearer '+ accessToken,
            'Prefer': 'return=representation'
        }
    })
    let output = {};
    let params = new URLSearchParams({$filter:`crb5c_nricno eq '${req.params.nric}' or crb5c_cara_id eq '${req.params.nric}'`});
    let {data} = await $.get(`/crb5c_fow_customers?${params.toString()}`);
    
    if(data.value.length){
        output.success = true;
        output.user_id =data.value[0].crb5c_fow_customerid;
    }else{
        output.success = false;
    }

    res.json(output)
}