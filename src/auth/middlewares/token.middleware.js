const jsonwebtoken = require("jsonwebtoken");
const logger = require("../../utils/logger");

function tokenMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    logger("No se paso el header authorization");
    return res.status(401).json({
      status: "error",
      message: "No tienes acceso",
    });
  }

  const [_, token] = authorization.split(" ");

  if (!token) {
    logger("No se paso correctamente Bearer {TOKEN}");
    return res.status(401).json({
      status: "error",
      message: "No tienes acceso",
    });
  }

  try {
    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    logger("JWT es invalido");
    return res.status(401).json({
      status: "error",
      message: "No tienes acceso",
    });
  }
}

module.exports = tokenMiddleware;
