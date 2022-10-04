const models = require('../models');
const { User } = models
//const fs = require("fs");


module.exports.uploadProfil = async (req, res) => {
    const { id } = req.params
    try {
        //console.log(req.file);
        req.file.fieldname = "profil"
        if (req.file == undefined) {
            return res.send(`Vous devez sélectionner un fichier.`);
        }
        await User.update({
            picture: `./uploads/${req.file.fieldname}/${req.file.filename}`,

        }, { where: { id: id } }).then((userprofil) => {
            if (!userprofil) return res.status(404).json('File not found.')

            return res.send(`La photo de profil a été mis à jour.`);
        });
    } catch (error) {
        console.log(error);
        return res.send(`Erreur lors du téléchargement d'images: ${error}`);
    }
}

module.exports.uploadCoverProfil = async (req, res) => {
    const { id } = req.params;

    try {

        if (req.file == undefined) return res.send('Vous devez sélectionner un fichier.');

        req.file.fieldname = "cover";

        const updateCoverPicture = await User.update({
            coverPicture: `./uploads/${req.file.fieldname}/${req.file.filename}`
        }, { where: { id } }
        )
        if (!updateCoverPicture) return res.status(404).json('File not found.');

        return res.send(`La photo de couverture a été mis à jour`)

    } catch (error) {
        console.log(error);
        return res.send(`Erreur lors du téléchargement d'images: ${error}`);
    }

}
