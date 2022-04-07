const express = require('express');
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user.routes');

require('dotenv').config({ path: './config/.env' });
//require('./config/config.json');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Routes

app.use('/api/user', userRoutes);

//Strating Server
app.listen(process.env.PORT, () => {
    console.log(`Listenning on port ${process.env.PORT}`)
})