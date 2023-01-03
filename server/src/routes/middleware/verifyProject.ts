module.exports =function(req,resp,next){
    var errArr=[];
    function verifyProject(name:String,url:String){
        // verify url
        const verifyUrl=url.indexOf("github.com");
        if(verifyUrl==0){
            errArr.push({url:"URL is not Valid. Must be GitHub"});
        }
        if(name==""){
            errArr.push({name:"Project name Required"});
        }
    }
}