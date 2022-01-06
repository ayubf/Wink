import express from 'express';
import User from '../models/User';

const router = express.Router()
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  if (!await User.exists({username: req.body.username})) {
      if (req.body.confirmPassword == req.body.password) {
        const newUser = await User.create({
          username: req.body.username,
          password: await bcrypt.hash(req.body.password, 10),
          votes: 0,
      })
      return res.sendStatus(201);
    } else {
      return res.sendStatus(401);
    }
  } else {
    return res.sendStatus(401);
  } 
})


router.post('/login', async (req, res) => {
  const user = await User.findOne({username: req.body.username}).exec()
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
      req.session.username = req.body.username;
      return res.sendStatus(200);
  } else {
    return res.sendStatus(401);
  }
});


router.delete("/signup", async (req, res) => {
    // Conditions
    // 1. User must exist
    // 2. Passwords must match
    // 3. Password must match db's hashed copy

    if (await User.exists({username: req.body.username})) {
      const user = await User.findOne({username: req.body.username})
      if (await bcrypt.compare(req.body.password, user.password) && req.body.password == req.body.confirmPassword) {
        user.remove();
        return res.sendStatus(200);
      } else {
        return res.sendStatus(401);
      } 
    } else {
      return res.sendStatus(404);
    }


})


router.put("/signup", async (req, res) => {
  const userExist = await User.exists({username: req.body.oldUsername})
  if (userExist) {
    const user = await User.findOne({username: req.body.oldUsername}).exec()

    if ((await bcrypt.compare(req.body.oldPassword, user.password))) {
      await User.updateOne({ username: req.body.oldUsername }, {
        $set: {
          username: req.body.username ? req.body.username : req.body.oldUsername,
          password: await bcrypt.hash(req.body.password ? req.body.password : req.body.oldPassword, 10),
        }
      })
      return res.sendStatus(200);
    } else {
      return res.sendStatus(401);
    }
  } else {
    return res.sendStatus(404);
  }
})





export default router


/// ADD A 404 PAGE LMAO
