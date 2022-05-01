const models = require('../models');
const { User } = models
//const fs = require("fs");


module.exports.uploadProfil = async (req, res) => {
    const { id } = req.params
    try {
        console.log(req.file);
        if (req.file == undefined) {
            return res.send(`Vous devez sélectionner un fichier.`);
        }
        await User.update({
            picture: "../frontend/public/uploads/profil/" + req.file.filename,

        }, { where: { id: id } }).then((userprofil) => {
            if (!userprofil) return res.status(404).json('File not found.')

            return res.send(`Le fichier a été téléchargé.`);
        });
    } catch (error) {
        console.log(error);
        return res.send(`Erreur lors du téléchargement d'images: ${error}`);
    }
}
