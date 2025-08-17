const express = require("express");
const {
    getAllUsers,
    register,
    login
} = require("../controller/Users.controller");
const verifyToken = require("../middleware/verifyToken");
const multer  = require('multer');
const Apperror = require("../utils/Apperror");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];
    
    if(imageType === 'image') {
        return cb(null, true)
    } else {
        return cb(Apperror.create('file must be an image', 400), false)
    }
}

const upload = multer({ storage : storage , fileFilter })

const router = express.Router();

router.route("/").get(verifyToken, getAllUsers);
router.route("/register").post(upload.single('avatar'), register);
router.route("/login").post(login);

module.exports = router;