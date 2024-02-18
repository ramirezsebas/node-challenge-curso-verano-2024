const { Router } = require("express");
const { loginController } = require("../controllers/auth.controller");

const authRouter = Router();

authRouter.post("/login", loginController);

module.exports = authRouter;
