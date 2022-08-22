const models = require('../models');

const { User, Post, Like } = models;
const jwtAuth = require('jsonwebtoken');



module.exports.likePost = async (req, res, next) => {

    //Getting user Id 
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;
    //Params 
    const postId = req.params.postId;



    try {

        const post = await Post.findByPk(postId)
        if (!post) return res.status(404).json('Post not found.');

        const user = User.findByPk(userId);
        if (!user) return res.status(404).json('User not found')

        //Verify if the user already like this post
        const postLiked = await Like.findOne({
            where: { userId, postId }
        })
        if (postLiked) {
            return res.status(409).json("Post already liked!");
        }

        await Like.create({
            userId, postId
        }).then((createLike) => {

            if (createLike) {
                //Create Like if no Like table is no found
                post.update({
                    likes: post.likes + 1
                })
                return res.status(201).json('Vous avez aimé cette publication.');
            }
        }).catch((err) => res.status(500).json("Cannot update like in the post." + err.message))


    }
    catch (err) {
        return next(res.status(500).json('Like Error.' + err))
    }

}


module.exports.disLikePost = async (req, res, next) => {
    const token = req.cookies.jwt;
    const decoded = jwtAuth.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.id;


    const postId = req.params.postId;

    try {

        const post = await Post.findByPk(postId)
        if (!post) return res.status(404).json('Post not found.')

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json('User not found');


        await Like.destroy({ where: { userId, postId } })
            .then((dislike) => {
                //Check if post is already dislike and update default values to 0
                if (dislike <= 0) {
                    post.update({
                        likes: 0,
                    })
                    res.status(409).json("Vous avez déjà disliker ce post.")
                } else {
                    //Delete  Like table and decrement values - 1
                    post.update({
                        likes: post.likes - 1
                    })
                    return res.status(200).json("Vous n'aimez plus ce post.")
                }
            })
    }
    catch (err) {
        return next(res.status(500).json('Like Error.'))
    }
}


