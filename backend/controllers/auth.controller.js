const models = require('../models');
const User = models.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { RequestError, UserError, AuthentificationError } = require('../utils/errors.utils')

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
    const { firstname, lastname, email, password, isAdmin } = req.body;

    if (!emailRegex.test(email))
        res.status(400).json({ 'msg': "Cet email est incorrect, reesayer SVP!" });

    if (!passwordRegex.test(password))
        res.status(400).json({ "msg": "Le mot de passe doit avoir 8 caractères et inclure 1 lettre majuscule, 1 chiffre et 1 caractère spécial" });



    if (!firstname || !lastname || !email || !password) {
        throw new RequestError('Veuillez remplir les champs obligatoire SVP!')
    }
    try {

        let userfound = await User.findOne({ where: { email: email, firstname: firstname, isAdmin }, raw: true })
        if (userfound !== null) {
            throw new UserError(`L'utilisateur ${firstname} existe déjà !`, 1)
        }
        //Encrypted password 
        bcrypt.hash(password, 10)
            .then(hash => {
                const user = User.create({
                    firstname,
                    lastname,
                    email,
                    password: hash,
                    isAdmin
                })

                res.status(201).json({ "user": user.id });
            })

    } catch (err) {
        next(err)

    }

}
//Login User
module.exports.signIn = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        if (!email && !password) {
            throw new AuthentificationError('Mauvais email ou mot de passe', 0)
        }

        const user = await User.findOne({ where: { email }, raw: true });

        // Verify if user exist in database
        if (user === null) {
            throw new AuthentificationError("Ce compte n'existe pas !", 1)
        }

        //Compare User password input with database Password
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            throw new AuthentificationError('Mot de passe erroné', 2)
        }

        const token = createToken(user.id);
        res.cookie('jwt', token, { httpOnly: true, maxAge })
        res.status(200).json({ userId: user.id, token })



    } catch (err) {
        next(err)
    }
}


//Change User password 
module.exports.changePassword = async (req, res) => {

    const { email, newPassword, confirmNewPassword } = req.body;

    //Compare NewPassword and ConfirmNewPasswor have the same values
    if (newPassword !== confirmNewPassword) return res.status(409).json('Les deux mots de passe ne sont pas identiques.')

    if (passwordRegex.test(newPassword) && passwordRegex.test(confirmNewPassword)) {

        User.findOne({ where: { email: email } })
            .then((user) => {
                if (!user) {
                    return res.status(404).json("Cet utilisateur n'existe pas sur ce site.")
                }

                if (user) {
                    bcrypt.compare(newPassword, user.password, (errComparePass, resComparePass) => {
                        //bcrypt renvoit resComparePassword si les mdp sont identiques donc aucun changement
                        if (resComparePass) {
                            res.status(400).json('Vous avez déjà utilisé ce mot de passe')
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