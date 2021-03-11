module.exports =function(req,resp,next){
    const {title,body,topic,user}=req.body;

    if(req.path=="/add-blog"){
        if(![title].every(Boolean)){
            return resp.json("Missing title");
        }else
        if(![body].every(Boolean)){
            return resp.json("Missing body");
        }else
        if(![topic].every(Boolean)){
            return resp.json("Missing topic");
        }else if(![user].every(Boolean)){
            return resp.json("Missing user");
        }
    }
    next();
}