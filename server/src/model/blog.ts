import mongoose from 'mongoose';
const Schemea=mongoose.Schema;

const blogSchema=new Schemea({
title:{
    type:String,
    required:true
},
topic:{
type:String ,
required:true
},
user:{
    type:String,
    required:true
    
},
date:{
    type:String,
    
},
body:{
    type:String,
    required:true
}

});

const Blogs=mongoose.model('Blogs',blogSchema);
module.exports=Blogs;