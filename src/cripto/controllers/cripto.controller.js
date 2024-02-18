
const logger = require("../../utils/logger");
const getAllCriptos = require("../services/cripto.services");

async function criptoController(req, res) {
  try {
    const criptos = await getAllCriptos();

    return res.status(200).json({
      status: "ok",
      message: "Se pudo obtener los criptos",
      data: criptos,
    });
  } catch (error) {
    logger("No se pudo conectar con https://api.coincap.io/v2/assets", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo obtener los criptos",
    });
  }
}

module.exports = criptoController;
