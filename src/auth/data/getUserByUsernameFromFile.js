const fs = require("fs");
const logger = require("../../utils/logger");

/**
 * Busca un usuario por username en el archivo usuarios.json
 * @param {string} username - El username del usuario a buscar.
 * @returns {Promise} - Una promesa que resuelve con el usuario encontrado o
 * con null si no se encontró.
 */
function getUserByUsernameFromFile(username) {
  if (fs.existsSync("usuarios.json") === false) {
    fs.writeFileSync("usuarios.json", "[]", "utf-8");
  }
  return fs.readFile("usuarios.json", "utf-8", (err, data) => {
    if (err) {
      logger("No se pudo acceder a la BD", err);
      throw Error("No se pudo acceder a la BD");
    }

    const usuarios = JSON.parse(data);

    const usuario = usuarios.find((usuario) => usuario.username === username);

    logger(`No se encontro el usuario ${username}`);

    return usuario;
  });
}

module.exports = {
  getUserByUsernameFromFile,
};
