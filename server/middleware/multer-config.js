const multer = require('multer');

const MIME_TYPES = { // notre dictionnaire d'extensions
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image.gif': 'gif'
};
/* const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            callback(null, true);
        } else {
            callback(null, false);
            return callback(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
        }
    }
}); */
const storage = multer.diskStorage({
    destination: (req, file, callback) => { // destination des images
        callback(null, 'upload');
    },
    filename: (req, file, callback) => { // nouveau nom du fichier image pour éviter les doublons
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});
module.exports = multer({ storage }).single('image');