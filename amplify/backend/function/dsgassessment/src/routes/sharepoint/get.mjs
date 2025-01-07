

export default async (req,res)=>{
    try {
      // eslint-disable-next-line 
        const {MS_APP_ID,TENANT_ID,DATAVERSE_DOMAIN_DEV, DATAVERSE_VERSION,MS_APP_SECRET} = process.env;
      const client_id = MS_APP_ID;
      const client_secret = MS_APP_SECRET;

      const tenant = TENANT_ID;
      
  
      const formData = new URLSearchParams({
        client_id: client_id,
        client_secret: client_secret,
        grant_type: 'client_credentials',
      scope: `https://graph.microsoft.com/.default`,
      });
  
      const response = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Access token:', data.access_token)
    res.json(data);
      
    } catch (error) {
      console.error('Error fetching access token:', error);
        res.status(500).send('Error fetching access token');
      
    }
  }