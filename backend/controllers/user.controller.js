const models = require('../models');

//Select User models in models
const User = models.User;


//Errors utils
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
            throw new RequestError("Nous avons rencontrer un problème merci de reessayer !", 0)
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


    //Getting id and body values
    const { id } = req.params
    const { body } = req;

    const user = User.findOne({ where: { id: id } })
    //Update user input values
    await User.findByPk(id)
        .then(userupdate => {

            if (!userupdate)
                UserError("Impossible de mettre à jour !", 0)

            if (userupdate !== user.id && userupdate !== user.isAdmin == false)
                return res.status(401).json('Impossible de modifier cet utlisateur.')

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
    const user = User.findOne({ where: { id: id } })

    // Delete user by Id
    User.destroy({ where: { id: id } })

        .then((userdelete) => {
            if (userdelete !== user.id && userdelete !== user.isAdmin == false)
                return res.status(401).json('Impossible de modifier cet utlisateur.')

            if (userdelete === 0) throw new RequestError("Cet utilisateur n'existe pas !")
            res.status(200).json({ 'message': 'Compte supprimé avec succès' })
        })
        .catch(err => {
            next(err)
        })

}