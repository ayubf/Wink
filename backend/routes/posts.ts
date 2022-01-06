import express from 'express';
import Post from '../models/Post';

const router = express.Router();

router.post('/createpost', async (req, res) => {
    if (!(await Post.exists({postTitle: req.body.postTitle}))) {
        const newPost = await Post.create({
          postTitle: req.body.postTitle,
          postTitleURL: req.body.postTitle.toLowerCase().replace(" ","-"),
          postBody: req.body.postBody,
          user: req.body.user
      })
      return res.sendStatus(200);
    } else {
      return res.sendStatus(400);
    } 
})

router.get('/', async (req, res) => {
  const posts = await Post.find().exec();
  return res.send(posts);  
})  


export default router
