module.exports =function(req,resp,next){
    var errArr=[];
    const {name,url,haveUrl}=req.body;
    function verifyProject(name:String,url:String){
        // verify url
        const verifyUrl=url.indexOf("github.com");
        if(verifyUrl==0&&haveUrl==true){
            errArr.push({url:"URL is not Valid. Must be GitHub"});
        }
        if(name==""){
            errArr.push({name:"Project name Required"});
        }
    }
    verifyProject(name,url);
    if(errArr.length>0){
        next(resp.status(200).json(errArr));
    }
    next();
}