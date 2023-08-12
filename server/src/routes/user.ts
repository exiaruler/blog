import * as express from 'express';
const router=express.Router();
const user=require('../model/user');
const passport=require('passport');
//import bcrypt from 'bcrypt';
import { isConstructorDeclaration } from 'typescript';
import {UserController} from '../controller/UserController';
const verifyUser=require('./middleware/verifyUser');
const createJwt=require('../token/createJWT');
const verifyLogin=require('./middleware/verifyLogin');
const userControl= new UserController();

router.post('/add-user',verifyLogin,verifyUser,async(req: express.Request, resp: express.Response, next: express.NextFunction) => {
   userControl.addUser(req,resp);
});


router.get('/all-users',verifyLogin,async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
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
    resp.send("User has been deleted");
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
    userControl.login(req,resp);
});



router.post('/logout',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    req.logOut(function(err){
        resp.clearCookie('connect.sid',{path:'/'});
        resp.status(200).send("Logged out");
    });
});

router.get('/user',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
resp.send(req.user);
console.log(req.user);
});


router.get('/get-user/:param/:id',(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
   const id = req.params['id'];
   const param=req.query['param'];
   
});
router.get('/auth',async(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    userControl.checkAuth(req,resp,next)
});





module.exports = router;