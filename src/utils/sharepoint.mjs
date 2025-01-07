import axios from 'axios';
export async function uploadFileToSharePoint(file, folderPath) {
    let fileName = `${file.name}-${new Date().getTime()}`;
    
    const url =  `https://graph.microsoft.com/v1.0/drives/${process.env.VUE_APP_SHAREPOINT_ID}/root:/${folderPath}/${fileName}:/content`;
    const token = await axios.get('/api/sharepoint').then(res => res.data.access_token);
    console.log(token);
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': file.type || 'application/octet-stream',
    };

    try{
        const response = await axios.put(url, file, {headers});
        return response;

    }
    catch(e){
        console.log(e);
    }

        
    
}