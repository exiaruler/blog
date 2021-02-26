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
    
},
date:{
    type:String,
    
},
body:{
    type:String
}

});

const Blogs=mongoose.model('Blogs',blogSchema);
module.exports=Blogs;