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
        let dir = `../frontend/public/uploads/` + file.fieldname;
        if (file.fieldname === "profil") {
            cb(null, dir);
        }  else if (file.fieldname === "cover") {
            cb(null, dir);
        } else {
            cb(null, `../frontend/public/uploads/post` )
        }

    },
    filename: (req, file, cb) => {
        let extension = MIME_TYPES[file.mimetype];
        let fileName = "";

        fileName = file.originalname + "." + extension;

        cb(null, `Groupomania_${Date.now()}_${fileName}`);
    },
});
module.exports = multer({ storage: storage, fileFilter: imageFilter });