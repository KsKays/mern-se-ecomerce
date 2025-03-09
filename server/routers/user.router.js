const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authJwt = require("../middlewares/authJwt.middleware");

// http://localhost:5000/api/v1/auth/sign
router.post("/sign", userController.sign);

router.post("/",  userController.addUser);

router.get("/", userController.getAllUser);

router.get("/role/:email", userController.getRoleByEmail);

router.put("/:id",authJwt.verifyToken, userController.updateUser);

router.delete("/:id",authJwt.verifyToken, userController.deleteUser);

router.patch("/admin/:email",authJwt.verifyToken, userController.makeAdmin);

router.patch("/user/:email",authJwt.verifyToken, userController.makeUser);

module.exports = router;
