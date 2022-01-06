import mongoose from 'mongoose';

const PostTemplate = new mongoose.Schema<IPost>({
    postTitle: {type: String, required: true},
    postTitleURL: {type: String, required: true},
    user: {type: String, required: true},
    postBody: {type: String, required: true},
    date: {type: Date, default: Date.now},
    views: {type: Number, default: 0}   
});

interface IPost extends Document {
    postTitle: String,
    postTitleURL: String,
    user: String,
    postBody: String,
    date: Number,
    views: Number
}



export default mongoose.model("Post", PostTemplate);
