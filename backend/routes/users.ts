import express from 'express';
import User from '../models/User';


const router = express.Router();

router.get('/:username', async (req, res) => {
    const user = await User.findOne({username: req.params.username})
    return res.send({
        username: user.username,
        views: user.views,
        date: user.date,
    });
})

router.get('/', async (req, res) => {
    const users = await User.find().exec();
    return res.send(users);
})


export default router;  


