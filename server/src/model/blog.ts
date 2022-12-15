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
    required:true
    
},
body:{
    type:String,
    required:true
},

image:{
    data:String,
    name:String
}


});

const Blogs=mongoose.model('Blogs',blogSchema);
module.exports=Blogs;