
const models = require('../models');

const { Forum, ForumMember, User, ForumMessage } = models;
const { Op } = require('sequelize');
const jwtAuth = require('jsonwebtoken');



/**
 * 
 * {create a group}
 * @param {type: request}
 */

module.exports.sendGroupMessage = async (req, res, next) => {

    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userTokenId = decoded.id;

    try {

        const { id } = req.params;

        const currentUser = await User.findByPk(userTokenId);
        console.log(currentUser.id);

        const currentForum = await Forum.findByPk(id);
        console.log(currentForum.id);

        const { message } = req.body;

        const allMembers = await ForumMember.findAll({
            where: { forumId: id },
        });

        const participants = allMembers.map((members) => members.userId);

        console.log(participants);


        if (!currentUser) return res.status(404).json("Vous devez vous connecter pour envoyer un message");
        if (!currentForum) return res.status(404).json("Ce forum n'existe pas");

        if (participants.includes(currentUser.id) || currentUser.isAdmin) {

            const newMessage = await ForumMessage.create({ message, userId: currentUser.id, forumId: id });

            return res.status(201).json(newMessage);

        } else {
            return res.status(401).json("Vous devez être membres de ce forum pour pouvoir envoyer des messages")

        }

    } catch (error) {
        return res.status(500).json(error.message)
    }

}