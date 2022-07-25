const models = require('../models');
const { User } = models
//const fs = require("fs");

//${req.protocol}://${req.get('host')}

module.exports.uploadProfil = async (req, res) => {
    const { id } = req.params
    try {
        console.log(req.file);
        const directory = "profil";

        if (req.file == undefined) {
            return res.send(`Vous devez sélectionner un fichier.`);
        }
        await User.update({
            picture: `./uploads/${directory}/${req.file.filename}`,

        }, { where: { id: id } }).then((userprofil) => {
            if (!userprofil) return res.status(404).json('File not found.')

            return res.send(`Le fichier a été téléchargé.`);
        });
    } catch (error) {
        console.log(error);
        return res.send(`Erreur lors du téléchargement d'images: ${error}`);
    }
}
