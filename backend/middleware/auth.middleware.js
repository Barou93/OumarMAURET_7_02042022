const jwt = require('jsonwebtoken');
const models = require('../models')

const User = models.User



//Permet de verifier si le token de User est valide et permettre à l'User de rester connectés 

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwt', '', { maxAge: 1 });
                next(err.message);
            } else {
                //console.log("decodedToken:" + decodedToken.id)
                let user = await User.findByPk(decodedToken.id);
                req.user = user;
                console.log(req.user)
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

//Verify if User is authentied in the App

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        //Verify the token of the user 
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
            } else {
                //console.log(decodedToken.id);
                next();

            }
        })
    } else {
        console.log('No Token')
    }
}

