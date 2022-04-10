const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');

require('dotenv').config({ path: './config/.env' });
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const errorHandler = require('./utils/errorsHandler.utils');
//require('./config/config.json');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//JWT TOKEN

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).json(res.locals.user.id)
})


//Routes

app.use('/api/user', userRoutes);

app.use(errorHandler)
//Strating Server
app.listen(process.env.PORT, () => {
    console.log(`Listenning on port ${process.env.PORT}`)
})