import * as mongoose from 'mongoose'
const Schemea=mongoose.Schema;


const userSchema = new Schemea({
    name:{
        type:String, 
        required:true
    },
 
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
       required:true   
    },
    role:{
        type:String,
 
    }
    

});


const Users=mongoose.model('Users',userSchema);
module.exports=Users;