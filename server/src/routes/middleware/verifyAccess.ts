import { Settings } from "../../Settings";
module.exports=function (req, resp, next){
    const setting=new Settings();
    const key=req.headers.apikey;
    checkKey(key);
    
    function checkKey(request:any){
        try{
            if(setting.apikey!=request){
                next(resp.status(401).send("Not Authorised ╭∩╮ʕ•ᴥ•ʔ╭∩╮"));
            }
        }catch(err){
            next(resp.status(401).send(err));
        }
    }
    next();
}