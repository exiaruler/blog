module.exports=function (req:any, resp:any, next:any){
    const user=req.isAuthenticated();
   
    checkLogin(user);
    
    function checkLogin(request:any){
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

