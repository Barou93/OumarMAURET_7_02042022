const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const likeRoutes = require('./routes/likes.routes');
const commentRoutes = require('./routes/comment.routes');
const followRoutes = require('./routes/follow.routes');
const path = require('path');
const cors = require('cors')
const socketIo = require('socket.io');
const http = require('http');

require('dotenv').config({ path: './config/.env' });
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const errorHandler = require('./utils/errorsHandler.utils');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

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
app.use(cors());

//JWT TOKEN

app.get('*', checkUser);

app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).json(res.locals.user.id)
})


//Upload Images Path directory
app.use('../frontend/public/uploads/post', express.static(path.join(__dirname, './frontend/public/uploads/post')));
app.use('../frontend/public/uploads/profil', express.static(path.join(__dirname, './frontend/public/uploads/profil')));

//Routes

app.use('/api/user', userRoutes);
app.use('/api/user', followRoutes);
app.use('/api/post', postRoutes);
app.use('/api/post', likeRoutes);
app.use('/api/post', commentRoutes);



//Eroors Middleware
app.use(errorHandler)

//Strating WebSocket Server

io.on('connection', () => {
    console.log('New Websocket connection')
})

//Strating Server
server.listen(process.env.PORT, () => {
    console.log(`Listenning on port ${process.env.PORT}`)
})