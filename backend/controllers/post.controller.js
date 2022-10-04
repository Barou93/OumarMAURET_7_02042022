const models = require('../models');

const { User, Post, Like, Comment } = models;
const jwtAuth = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');


module.exports.readPost = async (req, res, next) => {
    await Post.findAll({

        include: [

            { model: Like, attributes: ["id", "PostId", "userId"] },
            { model: Comment, attributes: ["id", "postId", "userId", "comments", "createdAt", "updatedAt"] }
        ],
        //Filter data in descending order: Highlight the latest publications
        order: [['createdAt', 'DESC']],



    }).then((posts) => res.status(200).json(posts))
        .catch((err) => {
            next(err)
        })
}

module.exports.createPost = async (req, res, next) => {

    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userTokenId = decoded.id;

    try {

        let { content } = req.body;

        await User.findOne({ where: { id: userTokenId } })
            .then(async (user) => {
                let attachmentURL;

                //Check if the post contains an image
                if (user !== null) {
                    if (req.file !== undefined) {

                        attachmentURL = `./uploads/post/${req.file.filename}`
                    }
                    else {
                        attachmentURL = ""

                    }

                    if ((content == "null" && attachmentURL == "null")) {
                        return res.status(400).json('Ecrivez quelques choses à publier 😒')
                    } else {
                        await Post.create(
                            {
                                content,
                                attachment: attachmentURL,
                                UserId: userTokenId
                            })
                            .then((post) => {

                                return res.status(201).json({ "Votre contenu vient d'être publier 😊": post.content })

                            })
                            .catch(err => res.status(400).json({ err }))
                    }

                }
            })


    } catch (err) {

        return res.status(500).json(err.message)
    }
}


module.exports.readOnePost = async (req, res) => {
    const { id } = req.params;
    await Post.findByPk(id).then((post) => res.status(200).json(post))
        .catch((err) => {
            next(err)
        })
}


module.exports.updatePost = async (req, res, next) => {

    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;

    const { id } = req.params;
    const { content } = req.body;


    const user = await User.findByPk(userId);

    await Post.findByPk(id)
        .then((post) => {
            if (!post) throw new UserError("Ce contenu n'existe pas !");

            //Check if the Userid is != of the UserId of the comment to delete and if the user is not Admin 
            if (post.UserId !== user.id && post.UserId !== user.isAdmin == false)
                return res.status(401).json('Vous ne pouvez pas modifier cette publication.😑')

            post.content = content;
            post.save()
                .then(() => res.status(201).json(post))
                .catch(err => res.status(401).json({ err }))
        }).catch((err) => {
            next(err)
        })
}

module.exports.deletePost = async (req, res, next) => {

    try {
        const { id } = req.params;
        const token = jwtAuth.verify(req.cookies.jwt, process.env.TOKEN_SECRET);
        const user = await User.findByPk(token.id);

        const post = await Post.findOne({ where: { id: id } });
        if (!post) return res.status(404).json('Utilisateur non trouvé.');
        if (post.UserId !== user.id && user.isAdmin === false) return res.status(401).json('Vous ne pouvez pas supprimer cette publication.');

        const filename = post.attachment.split('./uploads/post/')[1];
        console.log(filename)

        fs.unlink(`../frontend/public/uploads/post/${filename}`, () => {
            const result = Post.destroy({ where: { id: post.id } });
            if (!result) res.status(404).json("Ce contenu n'existe pas !")
            res.status(200).json('Ce contenu a été suppirmé avec succès !')
        });

    } catch (err) {
        next(err);
    }

}
