const multer = require("multer");
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'

};
const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Veuillez télécharger uniquement des images (jpeg,jpg, png & gif).", false);
    }
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let directory;
        directory = "profil" ? "profil" : "post",

            cb(null, `../frontend/public/uploads/${directory}`);
    },
    filename: (req, file, cb) => {
        let extension = MIME_TYPES[file.mimetype];
        let fileName = "";
        fileName = "profil" ? "profil" + "." + extension : file.originalname + "." + extension;
        fileName = "post" ? "post" + "." + extension : file.originalname + "." + extension;
        cb(null, `Groupomania_${Date.now()}_${fileName}`);
    },
});
module.exports = multer({ storage: storage, fileFilter: imageFilter });