require('dotenv').config();
module.exports=function (req, resp, next){
    const key=req.headers.apikey;
    checkKey(key);
    
    function checkKey(request:any){
        try{
            if(process.env.API_KEY!=request){
                next(resp.status(401).send("Not Authorised ╭∩╮ʕ•ᴥ•ʔ╭∩╮"));
            }
        }catch(err){
            next(resp.status(401).send(err));
        }
    }
    next();
}