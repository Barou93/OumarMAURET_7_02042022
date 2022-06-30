const models = require('../models');

const { Message, User, Conversation } = models;
const { Op } = require('sequelize');
const jwtAuth = require('jsonwebtoken');
const user = require('../models/user');

/**
 * 
 * @param {* create a new Message } req 
 * @param {* print sender message} res 
 * @returns 
 */

module.exports.createMessage = async (req, res) => {
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;

    try {
        const senderId = userId;
        const { message, receiver, conversationId } = req.body;

        if (!senderId) return res.status(404).json("Cet utilisateur n'a pas de compte");

        if (senderId === receiver) return res.status(403).json('Vous ne pouvez pas vous écrire à vous même');
        if (!message) return res.status(400).json('Vous ne pouvez pas envoyé un message sans contenu');

        let conversation;

        if (!conversationId) {
            conversation = await Conversation.findOne({
                where:
                {
                    receiver,
                    sender: senderId
                }
            });
            if (!conversation) {
                conversation = await Conversation.create({
                    sender: senderId,
                    receiver: receiver
                });
            }
        }

        //Store messages field in variable
        const messages = { senderId, message, conversationId: conversationId || conversation.id }

        await Message.create(messages).then((newMessage) => {
            return res.status(201).json(newMessage)
        })


    } catch (err) {
        res.status(500).json("msg: " + err.message)

    }
}

module.exports.sendMessage = async (req, res) => {
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;

    try {
        const currentUser = userId;
        const conversationId = parseInt(req.params.id);
        console.log(conversationId)
        const { message } = req.body;

        if (!currentUser) return res.status(404).json(' Utilisateur non trouvé');

        const conversation = await Conversation.findOne({
            where: {
                id: conversationId,
                [Op.or]: {
                    sender: currentUser,
                    receiver: currentUser
                }
            }
        });

        if (!conversation) return res.status(404).json('Cette conversation est indisponible')

        console.log(conversation.toJSON());
        if (conversation) {
            await Message.create({
                senderId: currentUser,
                message,
                conversationId
            }).then((addMessage) => {
                res.status(200).json(addMessage);
            })
        }
    } catch (err) {
        res.status(500).json("msg: " + err.message)

    }

}

module.exports.currentMessage = async (req, res) => {
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;

    try {
        const currentUser = userId;
        const conversationId = req.params.id;


        if (!conversationId) return res.status(404).json("Cette conversation n'est plus disponible");
        const conversation = await Conversation.findOne({
            where: { id: conversationId },
            attributes: ['id'],
            include: [
                {
                    model: Message,
                    as: 'messages'
                },

            ],
            order: [['createdAt', 'DESC']],

        });
        const lastMessage = conversation ? conversation.toJSON().messages[0] : res.status(403).json("Impossible d'afficher le dernier message");

        if (lastMessage.senderId === currentUser.id) {
            return res.status(403).json('Vous avez déjà envoyé ce message')
        }
        await Message.update({ isRead: true }, {
            where: {
                isRead: false,
                conversationId
            }
        }).then((message => {
            return res.status(204).json(message)
        }))


    } catch (err) {
        return res.status(500).json(err.message);

    }


}

module.exports.getMessages = async (req, res) => {
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;

    try {
        const users = userId;

        if (!user) return res.status(404).json('Utilisateur non  trouvé');

        const conversations = await Conversation.findAll({
            where: {
                [Op.or]: {
                    sender: users,
                    receiver: users
                },
            },
            attributes: ['id'],
            order: [[Message, 'createdAt', 'ASC']],
            include: [
                { model: Message },

                {
                    model: User,
                    as: 'senderUser',



                    attributes: ['firstname', 'lastname', 'picture'],

                    required: false
                },
                {
                    model: User,
                    as: 'recipient',



                    attributes: ['firstname', 'lastname', 'picture'],

                    required: false
                },
            ]
        }
        )

        for (let i = 0; i < conversations[i]; i++) {

            // définir les propriétés pour le nombre de notifications et l'aperçu du dernier message
            const message = conversations[i].toJSON();
            message.lastestMessage = message.messages[message.messages.length - 1].text;
            conversations[i] = message;

        }
        console.log(conversations)

        return res.status(200).json(conversations)

    } catch (err) {
        return res.status(500).json(err.message);
    }

}


/**
 * 
 * @param {Delete message} type {id}
 * @param {* delete user message in db} res 
 * @returns 
 */


module.exports.deleteMessage = async (req, res) => {
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;

    const { id } = req.params;

    const user = await User.findOne({ id: userId })
    const message = await Message.findOne({
        where: {
            id: id
        }
    })


    if (!user.id !== message.senderId && user.isAdmin === false) return res.status(409).json('Unauthorized Request!');
    if (!message) return res.status(404).json('Ce message a déjà été supprimé')

    const deleteMessage = await Message.destroy({
        where: {
            id: id
        }
    })
    return res.status(200).json({ "Ce message a été supprimé avec succès": deleteMessage })



}



