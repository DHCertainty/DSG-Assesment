import axios from 'axios';
import * as msal from "@azure/msal-node";
// import { createInvoice } from '../../utils/generateInvoiceNumber.mjs';
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
    try {
        const inv = req.body;
        console.log('inv',inv)
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
        // const invoiceCreated =  createInvoice($,inv);
        console.log("invoiceCreated");
        res.status(200).json();
    } catch (error) {
        console.error('Unable to generate invoice', error);
        res.status(500).json({ error: "An error occurred while creating the invoice." });
    }
    
                    
    
}