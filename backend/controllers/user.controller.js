const models = require('../models');

//Select User models in models
const User = models.User;

const Follow = models.Follow;
//Errors utils




//Getting All user iNFOS
module.exports.getAllUsers = async (req, res) => {

    //Select all user register in DB and print in the screen
    await User.findAll({

        //Get users followers/followings fields 
        include: [
            {
                model: User,
                as: 'followers',
                attributes: { exclude: ['password', 'isAdmin'] }

            },
            {
                model: User,
                as: 'followings',
                attributes: { exclude: ['password', 'isAdmin'] }

            },
        ],
        //Exclude some attributes like password, createdAt and updatedAt
        attributes: { exclude: ['password',] }

    }).then((users) => {
        res.status(200).json(users)
    })
        .catch((err) => {
            res.status(400).send(err)
        })

}

//Getting One user Infos
module.exports.userInfo = async (req, res, next) => {

    //Store ID in the req.params
    const { id } = req.params;
    await User.findByPk(id, {

        //Get user followers/followings fields 
        include: [
            {
                model: User,
                as: 'followers',
                attributes: { exclude: ['password', 'isAdmin'] }

            },
            {
                model: User,
                as: 'followings',
                attributes: { exclude: ['password', 'isAdmin'] }

            },
        ],

        //Exclude some attributes like password, createdAt and updatedAt
        attributes: { exclude: ['password'] }
    })
        .then((user) => {

            if (!user) res.status(404).send("Cet utilisateur n'existe pas !")

            res.status(200).json(user)
        })
        .catch((err) => {
            res.status(500).send(err)
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
                res.status(401).json("Impossible de mettre à jour !")

            if (userupdate !== user.id && userupdate !== user.isAdmin == false)
                return res.status(401).json('Impossible de modifier cet utlisateur.')

            if (userupdate === null) res.status(404).json("Cet utilisateur n'existe pas !")

            userupdate.bio = body.bio
            userupdate.save()
                .then(() => {
                    return res.status(201).json({ 'message': 'Mise à jour effectuée avec succès' })
                })
                .catch((err) => res.status(404).json({ err }))
        })
        .catch((err) => {
            return res.status(500).send(err);
        })

}

module.exports.deleteUser = (req, res, next) => {
    //Getting User Id in the params
    const { id } = req.params;
    const user = User.findOne({ where: { id: id } })

    // Delete user by Id
    User.destroy({ where: { id: id } })

        .then((userdelete) => {
            if (userdelete !== user.id && user.isAdmin == false)
                return res.status(401).json('Impossible de modifier cet utlisateur.')

            if (userdelete === 0) return res.status(404).json("Cet utilisateur n'existe pas !")
            res.status(200).json({ 'message': 'Compte supprimé avec succès' })
        })
        .catch(err => {
            return res.status(500).send(err);
        })

}