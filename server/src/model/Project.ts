import mongoose from 'mongoose';
const Schemea=mongoose.Schema;
const projectSchema=new Schemea({
    name:{
        type:String,
        required:true
    },
    url:{
        type:String,
    }
    });
    
    const Project=mongoose.model('Project',projectSchema);
    module.exports=Project;