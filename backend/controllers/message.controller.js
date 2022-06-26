const models = require('../models');

const { Message, User } = models;
const { Op } = require('sequelize');
const jwtAuth = require('jsonwebtoken');
const user = require('../models/user');



//Controllers

module.exports.createMessage = async (req, res) => {
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;

    try {
        const { receiverId, message } = req.body;
        console.log(userId);

        if (!userId) return res.status(404).json("Cet utilisateur n'a pas de compte");

        if (receiverId === userId) return res.status(403).json('Vous ne pouvez pas vous écrire à vous même');

        //Store messages field in variable
        const messages = {
            senderId: userId,
            receiverId: receiverId,
            message
        }
        console.log(messages)

        await Message.create(messages).then(async userMsgs => {
            await User.findOne({ where: { id: userId } }).then(user => {
                if (userMsgs) {
                    if (!user) return res.status(404).json('Utilisateur non trouvé dans la DB');
                    else {

                        //Add new data in the messages object includes firstname, lastname and picture values
                        messages["user"] = { firstname: user.firstname, lastname: user.lastname, picture: user.picture };
                        console.log(messages);
                        //Store newmessage values in socket io 
                        res.io.emit('newMessage', { receiverId: receiverId, senderId: userId, messages });
                        res.status(201).json(messages);
                    }
                }
            }

            )
        })


    } catch (err) {
        res.status(500).json("msg: " + err.message)

    }

}

module.exports.postMessage = (req, res) => {
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;

    try {

        Message.findAll({
            where: {
                senderId: { [Op.in]: { userId } },
                receiverId: { [Op.in]: { userId } }
            },
            include: [
                {
                    model: User,
                    as: 'user',
                }
            ]
        }).then(userMessages => res.status(200).json(userMessages))
            .catch(err => {
                return res.status(400).json(err.message)
            })

    } catch (err) {
        return res.status(500).json(err.message);

    }


}

module.exports.getMessages = async (req, res) => {
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;

    try {
        const otherUser = await User.findOne({
            where:
            {
                id: userId
            }
        });
        if (!otherUser) return res.status(404).json('Utilisateur non trouvé!');

        const users = otherUser.id
        console.log(otherUser.id)

        const messages = await Message.findAll({
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['firstname', 'lastname', 'picture', 'createdAt'],
                },
                {
                    model: User,
                    as: 'receiver',
                    attributes: ['firstname', 'lastname', 'picture', 'createdAt'],
                }
            ],

            attributes: ['message'],
            order: [['createdAt', 'DESC']],

        })
        if (!messages) return res.status(400).json('Impossible de récupérer les messages');
        return res.status(200).json(messages)


    } catch (err) {
        return res.status(500).json(err.message);
    }

}

module.exports.readMessage = (req, res) => {

}



module.exports.deleteMessage = (req, res) => {

}



