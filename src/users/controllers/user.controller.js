const { getCriptoById } = require("../../cripto/services/cripto.services");
const logger = require("../../utils/logger");
const {
  getUsersCriptos,
  saveUserCripto,
  findUserCripto,
} = require("../services/users.service");

async function getUserCriptosController(req, res) {
  const user = req.user;
  try {
    const userCriptos = await getUsersCriptos(user.username);

    return res.status(200).json({
      status: "ok",
      message: "Se pudo obtener los criptos",
      data: userCriptos,
    });
  } catch (error) {
    logger("Error obteniendo los criptos del usuarios", error);
    return res.status(500).json({
      status: "error",

      message: "Error interno del servidor",
    });
  }
}

async function saveUserCriptosController(req, res) {
  const user = req.user;

  const { idCripto } = req.body;

  if (!idCripto) {
    return res.status(400).json({
      status: "error",
      message: "Debes enviar el id de la cripto",
    });
  }

  try {
    const cripto = await getCriptoById(idCripto);
    if (!cripto) {
      return res.status(404).json({
        status: "error",
        message: "Cripto no encontrada",
      });
    }
  } catch (error) {
    logger("Error obteniendo la cripto", error);
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor",
    });
  }

  let userCripto;
  try {
    userCripto = await getCriptoById(idCripto);
    if (!userCripto) {
      return res.status(404).json({
        status: "error",
        message: "Cripto no encontrada",
      });
    }
  } catch (error) {
    logger("Error obteniendo la cripto", error);
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor",
    });
  }

  try {
    const foundedUserCripto = await findUserCripto(user.username, idCripto);
    if (foundedUserCripto) {
      return res.status(409).json({
        status: "error",
        message: "Cripto ya existe",
      });
    }
  } catch (error) {
    logger("Error obteniendo la cripto", error);
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor",
    });
  }

  try {
    const userCriptos = await saveUserCripto(user.username, userCripto);

    return res.status(200).json({
      status: "ok",
      message: "Se pudo crear el cripto del usuario",
      data: userCriptos,
    });
  } catch (error) {
    logger("Error obteniendo los criptos del usuarios", error);
    return res.status(500).json({
      status: "error",

      message: "Error interno del servidor",
    });
  }
}

module.exports = {
  getUserCriptosController,
  saveUserCriptosController,
};
