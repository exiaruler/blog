module.exports =function(req,resp,next){
    var errArr=[];
    const {name,url,haveUrl}=req.body;
    var error={
        name:"",
        url:""
    };
    function verifyProject(name:String,url:String,haveUrl:boolean){
        // verify url
        const verifyUrl=url.indexOf("github.com");
        if(verifyUrl==-1&&haveUrl==true){
            error.url="URL is not Valid. Must be GitHub";
        }else{
            if(url==""&&haveUrl==true){
                error.url="URL required";
            }
        }
        if(name==""){
            error.name="Project name Required";
        }
    }
    verifyProject(name,url,haveUrl);
    if(error.name!=""||error.url!=""){
        next(resp.status(200).json(error));
    }
    next();
}