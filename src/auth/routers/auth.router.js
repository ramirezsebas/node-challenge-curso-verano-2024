const { Router } = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/auth.controller");

const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.post("/register", registerController);

module.exports = authRouter;
