const { Router } = require("express");
const userController = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get("/:id/criptos", userController.getUserCriptosController);

userRouter.post("/:id/criptos", userController.saveUserCriptosController);

userRouter.delete("/:id/criptos/:idCripto", userController.deleteUserCriptosController);

module.exports = userRouter;
