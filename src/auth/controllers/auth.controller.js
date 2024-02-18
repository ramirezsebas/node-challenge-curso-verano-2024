const logger = require("../../utils/logger");
const {
  validatePassword,
  generateToken,
  searchUsername,
} = require("../services/login.service");


async function loginController(req, res) {
  // Validamos que venga username y password
  const { username, password } = req.body;

  if (!username) {
    logger("Debe incluir username y password");
    return res.status(400).json({
      status: "error",
      message: "Debes enviar username y password",
    });
  }

  if (!password) {
    logger("Debe incluir username y password");
    return res.status(400).json({
      status: "error",
      message: "Debes enviar username y password",
    });
  }

  // Debemos buscar username en la base de datos y ver si existe
  const usuario = searchUsername(username);

  if (!usuario) {
    logger("No se encontro el usuario");
    return res.status(400).json({
      status: "error",
      message: "username o password es incorrecto",
    });
  }

  // Debemos validar la contraseña
  try {
    const doesPasswordMatch = await validatePassword(
      password,
      usuario.password
    );

    if (!doesPasswordMatch) {
      logger("Contraseña invalido");
      return res.status(400).json({
        status: "error",
        message: "username o password es incorrecto",
      });
    }
  } catch (error) {
    logger("Error validando contraseña", error);
    return res.status(500).json({
      status: "error",
      message: "Error Interno del Servidor",
    });
  }

  // Generamos el JSONWEBTOKEN del usuario
  const token = generateToken(usuario.username);

  if (!token) {
    logger('No se pudo generar el token');
    return res.status(500).json({
      status: "error",
      message: "Error Interno del Servidor",
    });
  }

  return res.status(200).json({
    status: "ok",
    token,
  });
}

module.exports = {
  loginController,
};
