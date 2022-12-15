import mongoose from 'mongoose';
const Schemea=mongoose.Schema;

const keySchema=new Schemea({
key:{
    type:String,
    required:true
},
adminPermission:{
    type:Boolean,
    required:true
}

});

const Keys=mongoose.model('Key',keySchema);
module.exports=Keys;