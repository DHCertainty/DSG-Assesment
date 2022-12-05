const {MS_APP_ID,TENANT_ID,DATAVERSE_DOMAIN, DATAVERSE_VERSION} = process.env;

export default (req, res)=>{

    res.json({
        MS_APP_ID,TENANT_ID,DATAVERSE_DOMAIN,DATAVERSE_VERSION, ready: true
    })
}