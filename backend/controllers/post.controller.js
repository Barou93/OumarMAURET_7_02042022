const models = require('../models');

const { User, Post } = models;
const jwtAuth = require('jsonwebtoken');



module.exports.readPost = async (req, res, next) => {
    await Post.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }

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
        const { body } = req;
        console.log(body);
        await User.findOne({ where: { id: userTokenId } })
            .then(() => {

                if (userTokenId) {
                    const post = Post.create(
                        { ...body, userId: userTokenId })
                        .then(() => res.status(201).json({ "post": post }))
                        .catch(err => res.status(404).json({ 'Impossible de publier ce contenu !': + err }))

                }
            })


    } catch (err) {
        //throw new Error(err)

        next(err);
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
    console.log(req.params);

    const userFound = await User.findByPk(userId);

    await Post.findByPk(id)
        .then((post) => {
            if (!post) throw new UserError("Ce contenu n'existe pas !", 0);
            if (post.userId !== userFound.id) return res.status(401).json('Vous ne pouvez pas modifier cette publication.')
            post.content = body.content;
            post.save()
                .then(() => res.status(201).json(post))
                .catch(err => res.status(401).json({ err }))
        }).catch((err) => {
            next(err)
        })
}

module.exports.deletePost = async (req, res, next) => {

    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;

    const { id } = req.params;

    const user = await User.findByPk(userId);

    await Post.findOne({
        where: { id: id }
    }).then((postUserFound) => {
        if (!postUserFound) return res.status(404).json('Utilisateur non trouvé.');
        if (postUserFound.userId !== user.id) return res.status(401).json('Vous ne pouvez pas supprimer cette publication.')

        Post.destroy({ where: { id: id } })
            .then((post) => {
                if (post === 0) throw new RequestError("Ce contenu n'existe pas !")

                res.status(200).json('Ce contenu a été suppirmé avec succès !')
            })
            .catch(err => {
                next(err)
            })
    })



}


