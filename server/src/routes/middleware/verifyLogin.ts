
module.exports=function (req, resp, next){
    const user=req.isAuthenticated();
   
    checkLogin(user);
    
    function checkLogin(request:any){
        console.log(request);
        try{
            if(!request){
                next(resp.status(401).send("Not Authorised"));
            }
        }catch(err){
            next(resp.status(401).send(err));
        }
    }
    next();
}

