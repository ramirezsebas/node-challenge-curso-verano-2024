const logger = require("../../utils/logger");
const {
  validatePassword,
  generateToken,
  searchUsername,
  generateHashedPassword,
  saveToDB,
} = require("../services/auth.service");

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
  const usuario = await searchUsername(username);

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
    logger("No se pudo generar el token");
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

async function registerController(req, res) {
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

  // Validamos si ya existe usuario con el mismo username
  // Debemos buscar username en la base de datos y ver si existe
  const usuario = await searchUsername(username);

  if (usuario) {
    logger("Ya existe el usuario");
    return res.status(409).json({
      status: "error",
      message: "username ya existe",
    });
  }

  let hashedPassword;
  try {
    hashedPassword = await generateHashedPassword(password);
  } catch (error) {
    logger("Error generando hash...", error);
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor",
    });
  }

  let id;
  try {
    id = await saveToDB(username, hashedPassword);
  } catch (error) {
    logger("Error creando usuario...", error);
    return res.status(500).json({
      status: "error",
      message: "Error interno del servidor",
    });
  }

  return res.status(201).json({
    status: "ok",
    message: "Se creo exitosamente el usuario",
  });
}

module.exports = {
  loginController,
  registerController,
};
