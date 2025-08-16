const express = require("express");
const {
    getAllUsers,
    register,
    login
} = require("../controller/Users.controller");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.route("/").get(verifyToken, getAllUsers);
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;