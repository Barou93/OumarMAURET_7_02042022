const models = require('../models');
const User = models.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {

    return jwt.sign({ id }, process.env.TOKEN_SECRET, {

        expiresIn: maxAge// token validate for  3 days
    })
};

module.exports.signUp = (req, res) => {
    //Destructuring data is equivalent = firstname = req.body.firstname
    const { firstname, lastname, email, password } = req.body;

    console.log(req.body);


    try {
        bcrypt.hash(password, 10)
            .then(hash => {
                const user = User.create({
                    firstname,
                    lastname,
                    email,
                    password: hash,
                    isAdmin: 0
                })
                res.status(201).json({ 'user': user.id })
            })

    } catch (err) {
        res.status(200).send({ err: err })
    }

}
//Login User
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } })
        if (user) {

            //Compare User password input with database Password
            const auth = bcrypt.compare(password, user.password);
            if (auth) {
                const token = createToken(user.id);
                res.cookie('jwt', token, { httpOnly: true, maxAge })
                res.status(200).json({ "user": user.id })
            } else {
                return res.status(400).json({ 'message': 'Incorrect password' })
            }

        }

    } catch (err) {
        return res.status(404).json(err)
    }
}

//Disconnected User

module.exports.logout = async (req, res) => {
    //Delete cookie values
    res.cookie('jwt', '', { maxAge: 1 });

    //Redirect with login page
    res.redirect('/');

}