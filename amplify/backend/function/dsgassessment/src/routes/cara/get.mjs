import axios from 'axios';

export default async (req, res)=>{
    let output = {};
    let {data} = await axios.get(`https://api.cara.sg/accounts/rest/public/accounts/users/${req.params.cara_id}`);
    
    if(data.type =="SUCCESS"){
        output.success = true;
        output.membershipId =data.data.membershipId;
    
    }else{
        output.success = false;
    }

    res.json(output)
}