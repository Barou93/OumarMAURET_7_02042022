
const models = require('../models');

const { Follow, User } = models;




module.exports.follow = async (req, res, next) => {


    //Récupérer l'id dans les params
    const { id } = req.params

    const { followerId, followingId } = req.body;


    try {

        const user = await User.findByPk(id);



        if (user.id)

            await Follow.create({
                followerId: user.id,
                followingId: req.body.followerId
            })
                .then(async (userIdToFollow) => {
                    if (userIdToFollow) {

                        //Prevent the user from subscribing to himself
                        if (user.id === req.body.followerId) {
                            return res.status(401).json('Vous ne pouvez pas vous suivre😣');
                        }


                        if (followerId === undefined || followerId === "string") {
                            return res.status(400).json("Vous n'êtes pas authoriser à faire cette opération")
                        }
                        //Push follower/following to user table
                        await User.update(
                            { following: req.body.followerId },
                            { where: { id: user.id } })
                            .then((userIsFollow) => {
                                if (!userIsFollow) return res.status(404).json('Impossible de suivre ce utilisateur');
                                else return res.status(201).json({ "Vous venez de suivre : ": user.firstname + user.lastname })
                            });

                        await User.update(
                            { followers: user.id }, { where: { id: followerId } })
                            .then((userIsFollowing) => {
                                if (!userIsFollowing) return res.status(404).json("Impossible de trouver cet abonné")
                                else next();
                            })
                    }
                }).catch(err => res.status(400).json("Une erreur est intervenue merci de reesayer plutard" + err))

    } catch (err) {
        return res.status(500).json("err" + err)
    }

}

module.exports.unfollow = async (req, res) => {



}
