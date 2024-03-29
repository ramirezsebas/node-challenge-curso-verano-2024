const fs = require("fs/promises");
const logger = require("../../utils/logger");
const { createFileIfNotExists } = require("../../utils/fileUtils");

/**
 * Busca un usuario por username en el archivo usuarios.json
 * @param {string} username - El username del usuario a buscar.
 * @returns {Promise} - Una promesa que resuelve con el usuario encontrado o
 * con null si no se encontró.
 */
async function getUserByUsernameFromFile(username) {
  await createFileIfNotExists("usuarios.json");

  const usuariosJson = await fs.readFile("usuarios.json", "utf-8");

  const usuarios = JSON.parse(usuariosJson);

  const usuario = usuarios.find((usuario) => usuario.username === username);

  if (!usuario) {
    logger(`No se encontro el usuario ${username}`);
  }

  logger(`Se encontro el usuario ${username}`);

  return usuario;
}

async function saveUserToDBFile(username, password) {
  await createFileIfNotExists("usuarios.json");
  
  const usuariosJson = await fs.readFile("usuarios.json", "utf-8");

  const usuarios = JSON.parse(usuariosJson);

  usuarios.push({
    id: usuarios.length + 1,
    username,
    password,
  });

  await fs.writeFile("usuarios.json", JSON.stringify(usuarios));

  return username;
}

module.exports = {
  getUserByUsernameFromFile,
  saveUserToDBFile,
};
