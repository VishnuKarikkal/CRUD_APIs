const mongoose=require('mongoose')
const PSchema=mongoose.Schema(
    {
       type:String,
       body:String,
       createdAt:Date
    }
);
const Post=mongoose.model('Post',PSchema);
module.exports=Post;