const models = require('../models');
const User = models.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const { signUpErrors, signInErrors } = require('../utils/errors.utils');


//Token maxage validate in the browser
const maxAge = 3 * 24 * 60 * 60 * 1000;

//Create a token after user authentification
const createToken = (id) => {

    return jwt.sign({ id }, process.env.TOKEN_SECRET, {

        expiresIn: maxAge// token validate for  3 days
    })
};

//Verify if eamil and password values matched with the regex values

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

module.exports.signUp = async (req, res, next) => {
    //Destructuring data is equivalent = firstname = req.body.firstname
    const { firstname, lastname, email, password } = req.body;

    if (firstname === "" && lastname === "" && email === "" && password === "") {
        const errors = {
            firstname: 'Veuillez saisir votre prénom.',
            lastname: 'Veuillez saisir votre nom.',
            email: 'Veuillez saisir votre adresse e-mail.',
            password: 'Veuillez saisir votre mot de passe.',
        }
        return res.send({ errors });
    }


    if (!emailRegex.test(email)) {

        const errors = {
            email: "Cet email est incorrect, reesayer SVP!",
            password: "",
            firstname: "",
            lastname: ""
        };


        return res.send({ errors });
    }

    if (!passwordRegex.test(password)) {

        const errors = {
            firstname: "",
            lastname: "",
            email: "",
            password: "Le mot de passe doit avoir 8 caractères et inclure 1 lettre majuscule, 1 chiffre et 1 caractère spécial"
        }


        return res.send({ errors });
    }

    try {

        let userfound = await User.findOne({ where: { email: email } })
        if (userfound) {
            console.log(userfound);
            const errors = {
                email: 'Cet email est déjà pris! Saisissez une autre adresse e-mail',
                firstname: "",
                lastname: "",
                password: "",
            }
            return res.send({ errors });
        }


        //Encrypted password 
        bcrypt.hash(password, 10)
            .then(async hash => {
                const user = await User.create({
                    firstname,
                    lastname,
                    email,
                    password: hash,
                })

                res.status(201).json({ user: user.toJSON() });
            })

    } catch (err) {
        res.status(500).send(err.message)
    }

}
//Login User
module.exports.signIn = async (req, res, next) => {

    try {
        const { email, password } = req.body;


        const user = await User.findOne({ where: { email }, raw: true });

        if (email === "" && password === "") {
            const errors = {
                email: "Veuillez saisir votre adresse e-mail.",
                password: "Veuillez saisir votre mot de passe."
            }
            res.send({ errors });
            return;
        }


        // Verify if user exist in database
        if (!user) {
            const errors = {
                email: "Email incorrect",
                password: ''
            }
            res.send({ errors });
            return;
        }

        //Compare User password input with database Password
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            const errors = {
                email: '',
                password: 'Mot de passe erroné'
            }
            res.send({ errors });
            return;
        }

        const token = createToken(user.id);
        res.cookie('jwt', token, { httpOnly: true, maxAge })
        res.status(200).json({ user: user.id, token })


    } catch (err) {
        return res.status(500).send(err)
    }
}


//Change User password 
module.exports.changePassword = async (req, res) => {

    const { email, newPassword, confirmNewPassword } = req.body;

    //Compare NewPassword and ConfirmNewPasswor have the same values
    if (newPassword !== confirmNewPassword) {
        //return res.status(409).json('Les deux mots de passe ne sont pas identiques.')
        const errors = {
            newPassword: "Les deux mots de passe ne sont pas identiques.",
            confirmNewPassword: "Les deux mots de passe ne sont pas identiques.",
            email: ""
        }
        return res.send({ errors })

    }

    if (passwordRegex.test(newPassword) && passwordRegex.test(confirmNewPassword)) {

        User.findOne({ where: { email: email } })
            .then((user) => {
                if (!user) {
                    //return res.status(404).json()
                    const errors = {
                        email: "Cet utilisateur n'existe pas sur ce site.",
                        newPassword: "",
                        confirmNewPassword: ""
                    }
                    return res.send({ errors })
                }

                if (user) {
                    bcrypt.compare(newPassword, user.password, (errComparePass, resComparePass) => {
                        //bcrypt renvoit resComparePassword si les mdp sont identiques donc aucun changement
                        if (resComparePass) {
                            const errors = {
                                newPassword: "Vous avez déjà utilisé ce mot de passe",
                                confirmNewPassword: "",
                                email: "",
                            }
                            return res.send({ errors })
                        } else {
                            bcrypt.hash(newPassword, 10, (err, newHash) => {
                                User.update({
                                    password: newHash
                                }, { where: { id: user.id } })
                                    .then(() => res.status(200).json('Votre mot de passe a été modifié avec succès 😎'))
                                    .catch(() => res.status(500).json({ err }))
                            })
                        }
                    })
                } else {
                    return res.status(404).json('Impossible de mettre à jour votre mot de passe')
                }

            })
            .catch(err => {
                return res.status(500).json(err)
            })
    } else {
        return res.status(400).json({ "msg": "Le mot de passe doit avoir 8 caractères et inclure 1 lettre majuscule, 1 chiffre et 1 caractère spécial" });
    }

}


//Disconnected User

module.exports.logout = async (req, res) => {
    //Delete cookie values
    res.cookie('jwt', '', { maxAge: 1 });

    //Redirect with login page
    res.redirect('/');

}