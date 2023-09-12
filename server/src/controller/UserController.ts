import { Response, Request, response,NextFunction } from "express";
const user=require('../model/user');
const passport=require('passport');
import bcrypt from 'bcrypt';
 export class UserController {
    constructor(){
        new user();
    }
    async addUser(req:Request,res:Response){
        var userRole="user";
        try{
            const find=await user.findOne({username:req.body.username}).exec()
            if(!find){
                const hashPassword=await bcrypt.hash(req.body.password,10);
                const addUser=new user({name:req.body.name,username:req.body.username,password:hashPassword,role:req.body=userRole});
                await addUser.save();
                if(addUser){
                    res.status(200).send("user added "+req.body.username);
                }
            }
            res.status(200).send("Username already exists");
        }catch(err){
            res.status(500).send(err.message);
        }
    }
    async addAdminUser(){
        var userRole="admin";
        var username="admin";
        var password="adminSamuel123"
        try{
            const find=await user.findOne({username:"admin"}).exec()
            if(!find){
                const hashPassword=await bcrypt.hash(password,10);
                const addUser=new user({name:"admin",username:username,password:hashPassword,role:userRole});
                await addUser.save();
            }
        }catch(err){
           
        }
    }
    async login(req:Request,res:Response){
        var error={
            loginError:""
        };
        try{
            passport.authenticate("local", (err, user) => {
                if (err) throw err;
                if (!user){
                    error.loginError="Invalid credentials";
                     res.status(200).json(error);
                }
                else {
                  req.logIn(user, (err) => {
                    if (err) throw err;
                    res.status(200).send("Successfully Authenticated");
                  });
                }
              })(req, res);
        }catch(err){
            res.status(200).send(err.message);
        }
    }
    async checkAuth(req:Request,res:Response,next:NextFunction){
        if (!req.isAuthenticated()) { 
            res.status(401).send("unauthorised access");
        }else  res.status(200).send("Success");
    }

}



