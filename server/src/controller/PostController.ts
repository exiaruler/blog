const blog=require('../model/blog');
export class PostController{

    getBlog(id:String){
        blog.findById(id)
        .exec()
        .then(doc=>{
            console.log(doc._id);
            const data={
                "_id":doc._id
            }
            return data;
        })
        .catch(err=>{
            return err;
        });
    }
}