const models = require('../models');

const { Forum, ForumMember, User } = models;
const { Op } = require('sequelize');
const jwtAuth = require('jsonwebtoken');
const user = require('../models/user');


/**
 * 
 * {create a group}
 * @param {type: request}
 */

module.exports.createGroup = async (req, res, next) => {
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userTokenId = decoded.id;

    try {
        const currentUser = await User.findByPk(userTokenId);
        const { name, description } = req.body;

        //Check if the user is logged in or if he exists in the database
        if (!currentUser) return res.status(404).json('Vous devez être connecté pour accéder à cette page');

        const createByUserId = currentUser.id;
        //console.log(createByUserId);

        //Check if the Forum has already been created
        const isCreated = await Forum.findOne({
            where: { name, description, createByUserId },
            raw: true
        });

        if (isCreated) return res.status(401).json('Ce groupe a déjà été créer');


        //Create a new Forum
        const forum = await Forum.create({ name, description, createByUserId });

        if (!forum) return res.status(404).json({ succes: false, message: "Ce forum n'est plus disponible" })

        console.log(forum.toJSON())
        console.log(forum.createByUserId)

        let groupMembers

        //Save the forum creator as a member of the group
        if (forum.id) {
            groupMembers = await ForumMember.create({

                forumId: forum.id,
                userId: forum.createByUserId

            });
            res.status(201).json({
                succes: true,
                message: `Le forum ${forum.name} a été créer et le membre ${groupMembers.userId} ajouter avec succès `
            });
            console.log(groupMembers);

        } else {
            return res.status(403).json({
                succes: false,
                message: "Une erreur est survenue lors de la création du forum merci de réessayer SVP!"
            })
        }

    } catch (err) {
        return res.status(500).json(err.message)
    }
}

module.exports.updateGroup = async (req, res, next) => {

    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userTokenId = decoded.id;


    try {
        const user = await User.findOne({ where: { id: userTokenId } });
        console.log(user.id)

        if (!user) return res.status(404).json('Vous devez être connecté pour accéder à cette page');

        const id = parseInt(req.params.id);

        console.log(id)

        const { name, description, picture } = req.body

        const forum = await Forum.findOne(

            {
                where: { id: id }
            });
        console.log(forum)

        if (user.isAdmin && forum.createByUserId === user.id) {


            const updateForumInfos = await Forum.update({ name, description, picture }, {
                where: {
                    id: id
                }
            });
            console.log(updateForumInfos)
            return res.status(200).json("Les informations ont été modifier avec succès")
        } else {
            return res.status(401).json("Vous n'êtes pas authorisé à faire cette requête")
        }


    } catch (error) {
        return res.status(500).json(error.message)
    }

}

module.exports.addMembers = async (req, res, next) => {

    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userTokenId = decoded.id;

    try {
        const { id } = req.params;

        //Check if the UserID is connected in the DB
        const user = await User.findByPk(userTokenId);
        //Cancel the request if the user id is not available
        if (!user) return res.status(404).json('Vous devez être connecté pour accéder à cette page');

        const { userId } = req.body;

        //Check if all forum members is created in the forum
        const members = await ForumMember.findOne({ where: { forumId: id, userId }, });

        //console.log(members.forumId);
        if (userId === user.id) return res.status(401).json('Vous ne pouvez pas vous ajouter vous-même!');

        const forum = await Forum.findOne({ where: { id } });

        //If the forum doesn't exist
        if (!forum) return res.status(404).json("Ce forum n'existe pas merci de réessayer SVP!")

        //Store the new Forum members values
        const newMembers = { userId, forumId: id }

        //Check if the newMembers is already add in the forum
        if (members) {
            return res.status(401).json({ succes: false, message: 'Cet utilisateur fait déjà parti du forum' })
        }

        //Check if the user ID is either the board creator or the administrator 
        if (forum.createByUserId === user.id || user.isAdmin) {

            //Store the new members in the forum
            const addMembers = await ForumMember.create(newMembers);

            return res.status(200).json({
                success: true,
                message: `${addMembers.userId} vient d'intégrer le forum `

            })
        } else {
            return res.status(401).json("Vous devez être administrateur pour ajouter des personnes à ce forum")
        }
    }
    catch (error) {
        return res.status(500).json(error.message);

    }
}

module.exports.getAllGroups = async (req, res, next) => {
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userTokenId = decoded.id;

    try {

        let currentUser = await User.findByPk(userTokenId);
        currentUser == null ? res.status(404).json('Vous devez être connecté pour faire cette demande') : next();

        const allGroups = await Forum.findAll({
            order: [['createdAt', "ASC"]]
        });

        if (allGroups) return res.status(200).json(allGroups)

    } catch (error) {

        return res.status(500).json(error.message)

    }

}

module.exports.getGroupMembers = async (req, res, next) => {
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userTokenId = decoded.id;

    try {
        const { id } = req.params;
        console.log(id);

        //Check if the UserID is connected in the DB
        const currentUser = await User.findByPk(userTokenId);

        console.log(currentUser.id);

        //Cancel the request if the user id is not available
        if (!currentUser) return res.status(401).json({
            succes: false,
            message: 'Vous devez être connecté pour accéder à cette page'
        });

        //Check if the forum is created in the DB
        const forum = await ForumMember.findOne({ where: { forumId: id } });

        //Cancel the request if the user id is not available
        if (!forum) return res.status(404).json({
            success: false,
            message: "Ce forum n'existe pas"
        });

        //Retrieve group members with their names and photos
        const allMembers = await ForumMember.findAll({
            where: {
                forumId: id
            },
        });


        if (allMembers) return res.status(200).json({
            succes: true,
            response: allMembers
        });
        else return res.status(400).json('Impossible de recupérer les membres du groupe')

    } catch (error) {

        return res.status(500).json(error.message)

    }

}

module.exports.deleteMembers = async (req, res, next) => {
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userTokenId = decoded.id;


    try {
        const { id } = req.params;
        const currentUser = await User.findOne({ where: { id: userTokenId } });

        if (!currentUser) return res.status(404).json('Vous devez être connecté pour effectuer cette requête')

        const { userId } = req.body;

        const isCreator = await Forum.findByPk(id);

        console.log(isCreator)

        if (currentUser.id === userId) return res.status(401).json('Vous ne pouvez pas vous supprimer vous même')

        const members = await ForumMember.findOne({
            where: {
                userId,
            }
        });


        if (isCreator.createByUserId === currentUser.id || currentUser.isAdmin) {

            if (members) {
                const deleteMember = await ForumMember.destroy({
                    where: {
                        forumId: isCreator.id,
                        userId
                    }
                });
                if (deleteMember) {
                    return res.status(200).json({
                        succes: true,
                        message: `Le membre ${userId} a été supprimé avec succès!`
                    })
                }
            } else {
                return res.status(401).json({
                    succes: false,
                    message: `Ce membre a déjà été supprimer!`
                })

            }

        } else {
            return res.status(401).json({
                succes: false,
                message: "Vous n'êtes pas authorisé à faire cette requête"
            })
        }


    } catch (error) {
        return res.status(500).json(error.message)
    }

}
module.exports.leaveGroup = async (req, res, next) => {
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userTokenId = decoded.id;


    try {

        const { id } = req.params;

        const currentUser = await User.findOne({ where: { id: userTokenId } });

        if (!currentUser) return res.status(404).json('Vous devez être connecté pour effectuer cette requête')

        const { userId } = req.body;

        const currentForum = await Forum.findOne({ where: { id } });

        const isMember = await ForumMember.findOne({
            where: {
                userId,
            }
        });

        if (currentUser.id === userId) {

            if (currentForum) {
                if (isMember) {
                    const leaveMember = await ForumMember.destroy({
                        where: {
                            forumId: currentForum.id,
                            userId
                        }
                    });
                    return res.status(200).json({
                        succes: true,
                        message: `Vous venez de quitter le forum`
                    })
                }

            } else {
                return res.status(401).json({
                    succes: false,
                    message: `Vous avez déjà quitter ce forum!`
                })

            }

        } else {
            return res.status(401).json({
                succes: false,
                message: "Vous n'êtes pas authorisé à faire cette requête"
            })
        }


    } catch (error) {
        return res.status(500).json(error.message)
    }

}

module.exports.deleteGroup = async (req, res, next) => {

    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userTokenId = decoded.id;

    try {
        const id = req.params.id;
        console.log(id);


        const currentUser = await User.findByPk(userTokenId);

        if (!currentUser) return res.status(404).json('You must be logged in to make this request');

        const forum = await Forum.findByPk(id);
        console.log(forum.id);

        if (!forum) return res.status(404).json("This forum does not exist please try again!");

        if (forum.createByUserId === currentUser.id || currentUser.isAdmin) {

            const deleteForum = await Forum.destroy({ where: { id } });

            if (deleteForum) {

                const deleteMembers = await ForumMember.destroy({ where: { forumId: id } })

                return res.status(200).json(`The forum ${forum.name} has been deleted`);

            }
            else {
                return res.status(401).json(`You are not authorized to delete this forum`)
            }
        }

    } catch (error) {
        res.status(500).json(error.message)

    }

}

