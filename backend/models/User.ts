import mongoose from 'mongoose';

const UserTemplate = new mongoose.Schema<IUser>({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    posts: {type: [], default: []},
    views: {type: Number, default: 0},
    date: {type: Date, default: Date.now}
});

interface IUser extends mongoose.Document {
    username: String,
    password: String,
    posts: [],
    comments: [],
    views: Number,
    date: Number
}


export default mongoose.model("User", UserTemplate);
