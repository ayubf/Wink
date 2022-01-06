import express from 'express';
import 'dotenv/config';


// Routes & Routers
import mainRouter from './routes/main';
import postRouter from './routes/posts';
import authRouter from './routes/auth';

// Express Object
const server = express();

import session from 'express-session';

declare module 'express-session' {
    export interface SessionData {
      username: String;
    }
  }

server.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: { secure: false },
    })
)


// ORM for MongoDB
const mongoose = require('mongoose');

// // CORS
const cors = require('cors');
server.use(cors({  
    origin: "http://localhost:3000",
    optionSuccessStatus: 200
}))

server.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true.toString())
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })

server.set('trust proxy', 1);


// JSON
server.use(express.json());



// Connection established
mongoose.connect(
    process.env.DBCONN,
    { useNewUrlParser: true },
);

// Routers in use
server.use('/', mainRouter);
server.use('/', authRouter);
server.use('/posts', postRouter);



// Server started on port: number
server.listen(3001);

