const logger = require("../../utils/logger");
const { getAllCriptos } = require("../services/cripto.services");

async function criptoController(req, res) {
  const { limit, page, sortBy } = req.query;

  let newLimit = !limit || isNaN(limit) ? 10 : parseInt(limit);
  let newPage = !page || isNaN(page) ? 1 : parseInt(page);
  let newSortBy = !sortBy ? "orden" : sortBy;

  try {
    const criptos = await getAllCriptos(newLimit, newPage, newSortBy);

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
