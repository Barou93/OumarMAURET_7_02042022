const models = require('../models');

//Select User models in models
const User = models.User;

const { RequestError, UserError } = require('../utils/errors.utils')

//Getting All user iNFOS
module.exports.getAllUsers = async (req, res) => {

    //Select all user register in DB and print in the screen
    await User.findAll({
        //Exclude some attributes like password, createdAt and updatedAt
        attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
    }).then((users) => {
        res.status(200).json(users)
    })
        .catch((err) => {
            throw new Error(err)
        })

}

//Getting One user Infos
module.exports.userInfo = async (req, res, next) => {

    //Store ID in the req.params
    const { id } = req.params;
    await User.findByPk(id, {
        //Exclude some attributes like password, createdAt and updatedAt
        attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
    })
        .then((user) => {

            if (!user) throw new UserError("Cet utilisateur n'existe pas !", 0)

            res.status(200).json(user)
        })
        .catch((err) => {
            next(err)
        })
};

//Update User infos 

module.exports.UpdateUser = async (req, res, next) => {
    console.log(req.params.id);

    //Getting id and body values
    const { id } = req.params
    const { body } = req;
    console.log(body)

    //Update user input values
    await User.findByPk(id)
        .then(userupdate => {

            if (!userupdate) res.status(404).json({ "msg": "Impossible de mettre à jour! " });
            if (userupdate === null) throw new UserError("Cet utilisateur n'existe pas !", 0)

            userupdate.bio = body.bio
            userupdate.save()
                .then(() => res.status(201).json({ 'message': 'Mise à jour effectuée avec succès' }))
                .catch((err) => res.status(404).json({ err }))
        })
        .catch((err) => {
            next(err)
        })

}

module.exports.deleteUser = (req, res, next) => {
    //Getting User Id in the params
    const { id } = req.params;

    // Delete user by Id
    User.destroy({ where: { id: id } })
        .then((userdelete) => {
            if (userdelete === 0) throw new RequestError("Cet utilisateur n'existe pas !")
            res.status(200).json({ 'message': 'Compte supprimé avec succès' })
        })
        .catch(err => {
            next(err)
        })

}