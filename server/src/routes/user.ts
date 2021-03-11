import * as express from 'express';
const router=express.Router();
const user=require('../model/user');
const passport=require('passport');
import bcrypt from 'bcrypt';
const verifyUser=require('./middleware/verifyUser');



router.post('/add-user',verifyUser,async(req: express.Request, resp: express.Response, next: express.NextFunction) => {
    var userRole="user";
   user.findOne({username:req.body.username},async(err,doc)=>{
       if(err) throw err;
       if(doc)resp.send("user exist already");
    if(!doc){
    const hashPassword=await bcrypt.hash(req.body.password,10);
    const addUser=new user({name:req.body.name,username:req.body.username,password:hashPassword,role:req.body=userRole});
    await addUser.save();
        resp.send("user created");
        resp.end();
    }
    
   });

});


router.get('/all-users',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    try {
        let items: any = await user.find({});
        items = items.map((item) => { return {id: item._id, name: item.name,username: item.username,password: item.password,role:item.role}});
        resp.json(items);
    } catch (err) {
        resp.status(500);
        resp.end();
        console.error('Caught error', err);
    } 
});




router.delete('/delete-user/:id',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    const id = req.params['id'];
 
    await user.findByIdAndRemove(id);
    resp.end();
});


router.put('/change-password/:id',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    const id=req.params['id'];
    const password=req.body['password'];
    await user.findByIdAndUpdate(id,{"password":password});
    resp.end();
});

router.put('/change-role/:id',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    const id = req.params['id'];
    const role=req.body['role'];
    await user.findByIdAndUpdate(id,{"role":role});
    resp.end();
});

router.put('/change-username/:id',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    const id = req.params['id'];
    const username=req.body['username'];
    await user.findByIdAndUpdate(id,{"username":username});
    resp.end();

});

router.post('/login',verifyUser,async(req: express.Request, resp: express.Response, next:express.NextFunction)=>{
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) resp.send("No User Exists");
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            resp.send("Successfully Authenticated");
            console.log(req.user);
          });
        }
      })(req, resp, next);
  
});



router.get('/logout',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    req.logOut();
    resp.clearCookie('connect.sid',{path:'/'});
    resp.send("Logged out");
});

router.get('/user',(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
resp.send(req.user);
console.log(req.user);
});


router.get('/get-username/:id',(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
   const id = req.params['id'];
   
    });
    
    
    



module.exports = router;