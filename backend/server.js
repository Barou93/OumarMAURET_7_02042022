//Dependances
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors')
const { Server } = require('socket.io');
const http = require('http');


const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const likeRoutes = require('./routes/likes.routes');
const commentRoutes = require('./routes/comment.routes');
const followRoutes = require('./routes/follow.routes');
const messageRoutes = require('./routes/message.routes');
const groupRoutes = require('./routes/group.routes');


require('dotenv').config({ path: './config/.env' });
const { checkUser, requireAuth } = require('./middleware/auth.middleware');


const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: process.env.FRONT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false

}
app.use(cors(corsOptions));

//JWT TOKEN

app.get('*', checkUser);

app.get('/jwtid', requireAuth, (req, res) => {
    //console.log(res.locals.user.id)
    return res.status(200).send(res.locals.user.id)
})

//Use Socket
app.use((req, res, next) => {
    res.io = io;
    next();
})


//Routes
app.use('/api/user', userRoutes);
app.use('/api/user', followRoutes);
app.use('/api/post', postRoutes);
app.use('/api/post', likeRoutes);
app.use('/api/post', commentRoutes);
app.use('/api/message/', messageRoutes);
app.use('/api/group/', groupRoutes);

//Strating Server
server.listen(process.env.PORT, () => {
    console.log(`Listenning on port ${process.env.PORT}`)
})