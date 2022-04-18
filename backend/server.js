const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const likeRoutes = require('./routes/likes.routes');
const cors = require('cors')

require('dotenv').config({ path: './config/.env' });
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const errorHandler = require('./utils/errorsHandler.utils');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//JWT TOKEN

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).json(res.locals.user.id)
})


//Routes

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/post', likeRoutes);


//Eroors Middleware
app.use(errorHandler)
//Strating Server
app.listen(process.env.PORT, () => {
    console.log(`Listenning on port ${process.env.PORT}`)
})