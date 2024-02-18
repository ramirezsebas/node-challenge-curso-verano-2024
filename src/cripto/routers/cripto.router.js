const { Router } = require("express");
const criptoController = require("../controllers/cripto.controller");

const criptoRouter = Router();

criptoRouter.get("/", criptoController);

module.exports = criptoRouter;
