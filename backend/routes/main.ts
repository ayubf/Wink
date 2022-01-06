import express from 'express';
import User from '../models/User';
import Post from '../models/Post';
const router = express.Router();


router.post('/profile', async (req, res) => {
    const user = await User.findOne({username: req.body.username}).exec();
    const posts = await Post.find({user: req.body.username}).exec();

    return res.send({
        user: user,
        posts: posts.map((post) => {
            return {
                postTitle: post.postTitle,
                postBody: post.postBody
            }
        })
    });
})
export default router
