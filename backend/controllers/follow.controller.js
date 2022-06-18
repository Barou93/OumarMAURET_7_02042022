
const models = require('../models');

const { Follow, User } = models;


module.exports.follow = async (req, res) => {

    try {
        //Récupérer l'id dans les params

        const { id } = req.params;
        const follower = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        console.log(follower.id);



        const { followerId } = req.body

        const currentUser = await Follow.findOne({
            where: { followerId: follower.id, followingId: followerId }
        })


        //If params id is the same as the id of the req.body 
        if (follower.id === req.body.followerId) {

            return res.status(403).json("Vous pouvez pas vous suivre")
        }



        //Check if the id of the req.body is not already available in db

        if (!currentUser) {
            await Follow.create({
                followerId: follower.id,
                followingId: req.body.followerId

            }).then(() => {
                return res.status(200).json({
                    msg: `Vous venez de suivre ce collaborateur`,
                })
            }).catch(err => {
                return res.status(400).json('Impossible de faire cette demande ' + err)
            })

        } else {
            return res.status(403).json('Vous suivez déjà ce collaborateur')
        }

    } catch (err) {
        return res.status(500).json("ERR" + err)
    }
}



module.exports.unfollow = async (req, res) => {

    try {
        //Récupérer l'id dans les params

        const { id } = req.params;
        const follower = await User.findByPk(id);


        const { followerId } = req.body

        const currentUser = await Follow.findOne({
            where: { followerId: follower.id, followingId: followerId }
        })
        //console.log(currentUser.id);

        //If params id is the same as the id of the req.body 
        if (follower.id === req.body.followerId) {

            return res.status(403).json("Vous pouvez pas vous désabonnez à vous même")
        }

        //Check if the id of the req.body is not already available in db
        console.log(currentUser);
        if (currentUser) {
            await Follow.destroy({
                where: {
                    followerId: follower.id,
                    followingId: req.body.followerId,
                }

            }).then(() => {
                return res.status(200).json({
                    msg: `Vous ne suivez plus user id:${followerId}`,
                })
            }).catch(err => {
                return res.status(400).json('Impossible de faire cette demande ' + err)
            })

        } else {
            return res.status(403).json('Vous êtes déjà désabonner à ce collaborateur')
        }

    } catch (err) {
        return res.status(500).json("ERR" + err)
    }

}
