
const user=require('../model/user');
import bcrypt from 'bcrypt';
 export class UserController {
    addUser(name:String,username:String,password:String){
        var userRole="user";
        user.findOne({username:username},async(err,doc)=>{
            if(err) throw err;
            if(doc){
                return "User already exists";
            }
         if(!doc){
         const hashPassword=await bcrypt.hash(password,10);
         const addUser=new user({name:username,username:username,password:hashPassword,role:userRole});
         await addUser.save();
             return "User created";
         }
         
        });
    }

}
//module.exports=User;


