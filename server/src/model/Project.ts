import mongoose from 'mongoose';
const Schemea=mongoose.Schema;
const projectSchema=new Schemea({
    projectName:{
        type:String,
        required:true
    },
    projectUrl:{
        type:String,
    }
    
    });
    
    const Project=mongoose.model('Project',projectSchema);
    module.exports=Project;