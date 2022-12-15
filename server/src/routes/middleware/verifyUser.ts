module.exports =function(req, resp, next){
    const {username,name,password}=req.body;

    function validPasswordLength(password){
        return/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password);
    }
    function validUsernameLength(username){
        if(username.length<7){
            return true;
        }
        return false;
    }

    if(req.path=="/add-user"){
    if(![username].every(Boolean)){
        return resp.json("Missing username");
    }else 
    if(![name].every(Boolean)){
        return resp.json("Missing name");
    }else 
    if(![password].every(Boolean)){
        return resp.json("Missing password");
    }else 
    if(!validPasswordLength(password)){
        return resp.json("Password does not meet the requird specification");
    } else 
    if(!validUsernameLength(username)){
        return resp.json("Username does not meet the required specification");
    }
}
    else 
    if(req.path=="/login"){
        if (![username].every(Boolean)) {
            return resp.json("Missing Username!");
          } else if (![password].every(Boolean)) {
            return resp.json("Missing Password!");
          }
    }
    
    next();
}

