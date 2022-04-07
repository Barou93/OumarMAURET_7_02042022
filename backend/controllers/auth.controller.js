const models = require('../models');
const User = models.User;
const bcrypt = require('bcrypt');

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