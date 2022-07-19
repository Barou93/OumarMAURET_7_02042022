const models = require('../models');

const { User, Post } = models;
const jwtAuth = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');


module.exports.readPost = async (req, res, next) => {
    await Post.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },

        //Filter data in descending order: Highlight the latest publications
        order: [['createdAt', 'DESC']]

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
        console.log(content);
        await User.findOne({ where: { id: userTokenId } })
            .then(async (user) => {
                let attachmentURL;
                const directory = "post";

                //Check if the post contains an image
                if (user !== null) {
                    if (req.file !== undefined) {
                        attachmentURL = `${req.protocol}://${req.get('host')}../frontend/public/uploads/${directory}/${req.file.filename}`
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

                                console.log(post)
                                return res.status(201).json({ "Votre contenu vient d'être publier 😊": post.content })

                            })
                            .catch(err => res.status(400).json({ 'Impossible de publier ce contenu 😥!': + err.message }))
                    }

                }
            })


    } catch (err) {

        return res.status(500).json(err.message)
    }
}


module.exports.readOnePost = async (req, res) => {
    const { id } = req.params;
    await Post.findByPk(id, {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    }).then((post) => res.status(200).json(post))
        .catch((err) => {
            next(err)
        })
}


module.exports.updatePost = async (req, res, next) => {

    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;

    const { id } = req.params;
    const { body } = req;


    const user = await User.findByPk(userId);

    await Post.findByPk(id)
        .then((post) => {
            if (!post) throw new UserError("Ce contenu n'existe pas !", 0);

            //Check if the Userid is != of the UserId of the comment to delete and if the user is not Admin 
            if (post.UserId !== user.id && post.UserId !== user.isAdmin == false)
                return res.status(401).json('Vous ne pouvez pas modifier cette publication.😑')

            post.content = body.content;
            post.save()
                .then(() => res.status(201).json(post))
                .catch(err => res.status(401).json({ err }))
        }).catch((err) => {
            next(err)
        })
}

module.exports.deletePost = async (req, res, next) => {

    try {
        //Get the id of the user in the cookie token
        const { id } = req.params;
        const token = jwtAuth.verify(req.cookies.jwt, process.env.TOKEN_SECRET);
        const user = await User.findByPk(token.id);

        const post = await Post.findOne({ where: { id: id } });

        if (!post) return res.status(404).json('Utilisateur non trouvé.😥');

        //Check if the Userid is != of the UserId of the comment to delete and if the user is not Admin 
        if (post.UserId !== user.id && post.UserId !== user.isAdmin == false)
            return res.status(401).json('Vous ne pouvez pas supprimer cette publication.😑');

        const result = await Post.destroy({ where: { id: post.id }, truncate: { cascade: false } });

        if (result === 0) throw new RequestError("Ce contenu n'existe pas 😥!")

        const filename = post.attachment.split('../frontend/public/uploads/post/')[1];
        const filepath = path.resolve(`../frontend/public/uploads/post/${filename}`)
        await fs.unlink(filepath);

        res.status(200).json('Ce contenu a été suppirmé avec succès 😊!')
    } catch (err) {
        next(err);
    }

}
