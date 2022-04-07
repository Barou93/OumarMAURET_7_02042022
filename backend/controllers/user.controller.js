const models = require('../models');

//Select User models in models
const User = models.User;

//Getting All user iNFOS
module.exports.getAllUsers = async (req, res) => {

    //Select all user register in DB and print in the screen
    const users = await User.findAll({
        //Exclude some attributes like password, createdAt and updatedAt
        attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
    })

    res.status(200).json(users)
}

//Getting One user Infos
module.exports.userInfo = async (req, res) => {

    //Store ID in the req.params
    const { id } = req.params;
    await User.findByPk(id, {
        //Exclude some attributes like password, createdAt and updatedAt
        attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
    })
        .then((user) => {
            if (!user) return res.status(400).json({ 'ID unknown :': + id })
            res.status(200).json(user)
        })
        .catch((err) => res.status(404).json[{ 'Id Not Found : ': + err }])
};

//Update User infos 

module.exports.UpdateUser = async (req, res) => {
    console.log(req.params.id);

    //Getting id and body values
    const { id } = req.params
    const { body } = req;
    console.log(body)
    //Update user input values
    await User.findByPk(id)
        .then(userupdate => {
            if (!userupdate) return res.status(400).json({ 'message': 'User Not Found' });
            userupdate.bio = body.bio
            userupdate.save()
                .then(() => res.status(201).json({ 'message': 'Mise à jour effectuée avec succès' }))
                .catch((err) => res.status(404).json({ err }))
        })
        .catch((err) => res.status(404).json({ 'Id Not Found : ': + err }))

}

module.exports.deleteUser = (req, res) => {
    //Getting User Id in the params
    const { id } = req.params;

    // Delete user by Id
    User.destroy({ where: { id: id } })
        .then((userdelete) => {
            if (userdelete === 0) return res.status(404).json({ 'message': 'User Not Found' })
            res.status(200).json({ 'message': 'Compte supprimé avec succès' })
        })
        .catch(err => res.status(500).json(err))

}