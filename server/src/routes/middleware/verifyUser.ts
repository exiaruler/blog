module.exports =function(req, resp, next){
    const {username,name,password}=req.body;
    var error={
        userNameError:"",
        passwordError:"",
        nameError:"",
        loginError:""
    };
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
        error.userNameError="Missing username";
    }else 
    if(![name].every(Boolean)){
        error.nameError="Missing name";
    }else 
    if(![password].every(Boolean)){
        error.passwordError="Missing password";
    }else 
    if(!validPasswordLength(password)){
        error.passwordError="Password does not meet the requird specification"
    } else 
    if(!validUsernameLength(username)){
        error.userNameError="Username does not meet the required specification";
    }
    if(Object.keys(error).length==0){
        return resp.json(error);
    }
}
    else 
    if(req.path=="/login"){
        if(![username].every(Boolean)&&![password].every(Boolean)){
            error.userNameError="Missing Username!";
            error.passwordError="Missing Password!";
            return resp.json(error);
        }
        if (![username].every(Boolean)) {
            error.userNameError="Missing Username!";
            return resp.json(error);
          } else if (![password].every(Boolean)) {
            error.passwordError="Missing Password!";
            return resp.json(error);
          }
    }
    
    next();
}

