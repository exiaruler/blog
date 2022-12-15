module.exports =function(req,resp,next){
    const {title,body,topic,user}=req.body;
    var error=[];
    function checkPost(title,body,topic,user){
        if(title.length==0){
            error.push({title:"Title missing"});
        }
        if(body.length==0){
            error.push({body:"Body is empty"});
        }
        if(topic.length==0){
            error.push({topic:"Topic missing"});
        }
        if(user.length==0){
            error.push({user:"User missing"});
        }
    }
   checkPost(title,body,topic,user);
   console.log(error);
   if (error.length>0){
       next(resp.json(error));
   }
    next();
}