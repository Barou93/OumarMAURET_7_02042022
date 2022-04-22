const models = require('../models');

const { User, Post, Comment } = models;
const jwtAuth = require('jsonwebtoken');
const { post } = require('../routes/comment.routes');


module.exports.createCommentPost = async (req, res, next) => {
    //Getting user Id 
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;

    //Params 
    const postId = req.params.postId;

    try {

        const user = await User.findByPk(userId);
        const { comments } = req.body

        const post = await Post.findByPk(postId);

        //Verify if userId and PostId is found in database 
        if (user && post) {
            //Find or Create userId, postId and comments values in the dabatase
            await Comment.findOrCreate({
                where: {
                    userId,
                    postId,
                    comments: comments
                }
            }).then((createComment) => {
                if (createComment) {
                    //Update comments in the post values and save
                    post.update({
                        comments: comments
                    })
                    //createComment.save()
                    return res.status(201).json({ "msg": "Votre commentaire a correctement été ajouter!." })
                }
            }).catch((err) => res.status(400).json("Désolé, impossible d'ajouter votre commentaire !" + err))
        }


    } catch (err) {
        next(res.status(500).json({ err }))
    }


}

module.exports.readComments = async (req, res, next) => {
    await Comment.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt',] }

    }).then((comments) => {

        res.status(200).json(comments)
    })
        .catch((err) => {
            next(err)
        })

}



module.exports.editCommentPost = async (req, res, next) => {
    //Getting user Id 
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;

    //Params
    const postId = req.params.postId;
    const { id } = req.params;

    const { comments } = req.body;


    try {

        const post = await Post.findByPk(postId);
        const userFound = await User.findByPk(userId)

        await Comment.findOne({
            attributes: ["id", "userId", "postId"],
            where: { id }
        })
            .then((commentFound) => {
                if (!commentFound) return res.status(404).json('Ce commentaire est indisponible.')
                if (commentFound.userId !== userFound.id) return res.status(401).json('Impossible de modifier ce commentaire.')
                //return res.status(401).send("Vous ne pouvez pas modifier ce commentaire.")
                Comment.update({ comments: comments }, {
                    where: { id: id }
                }).then((updateComment) => {
                    if (updateComment) {
                        post.update({
                            comments: comments
                        })
                        return res.status(200).json('Vous venez de modifier ce commentaire. ')
                    }

                }).catch((err) => {
                    return res.status(400).json({ err })

                })
            }
            ).catch(err => res.status(500).send("Erreur de requête." + err))


    } catch (err) {
        return res.status(500).json('Comments Error.' + err)
    }
}
module.exports.deleteCommentPost = async (req, res) => {
    //Getting user Id 
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;

    //Params
    const postId = req.params.postId;
    const { id } = req.params;



    try {
        const post = await Post.findByPk(postId);
        const user = await User.findByPk(userId)

        await Comment.findOne({
            attributes: ["id", "userId", "postId"],
            where: { id }
        }).then((deleteComment) => {
            if (!deleteComment) return res.status(404).json('Ce commentaire est indisponible.')
            if (deleteComment.userId !== user.id) return res.status(401).json('Impossible de supprimer ce commentaire.')

            Comment.destroy({ where: { id: id } })
                .then((comment) => {
                    if (comment) {
                        return res.status(200).json('Ce commentaire a été bien supprimer 👍');
                    }

                }).catch((err) => res.status(400).json({ err }))


        })



    } catch (err) {
        return res.status(500).json({ err })

    }

}