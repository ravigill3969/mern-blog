import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc9I6_ka_338eyIuwcv3ehJucDXxZhgdkkxw&s"
    },
    categories:{
        type:String,
        default:'uncategorized'
    }
},{timestamps:true})

const Post = mongoose.model('Post',postSchema);
export default Post;