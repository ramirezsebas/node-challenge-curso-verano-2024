const {
  getUserByUsernameFromFile,
  saveUserToDBFile,
} = require("../data/auth.data");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

/**
 * Busca un usuario por su username en la base de datos.
 * @param {string} username - El username del usuario a buscar.
 * @returns {Promise} - Una promesa que resuelve con el usuario encontrado o
 * con null si no se encontró.
 */
function searchUsername(username) {
  return getUserByUsernameFromFile(username);
}

/**
 *
 * @param {string} rawPassword
 * @param {string} encryptedPassword
 * @returns
 */
async function validatePassword(rawPassword, encryptedPassword) {
  return bcrypt.compare(
    rawPassword,
    encryptedPassword
  );
}

/**
 * Genera un token para un usuario
 * @param {string} username - El username del usuario.
 * @returns {string} - El token generado.
 */
function generateToken(username) {
  return jsonwebtoken.sign(
    {
      username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5m",
    }
  );
}

async function generateHashedPassword(rawPassword) {
  return bcrypt.hash(rawPassword, 10);
}

async function saveToDB(username, password) {
  return saveUserToDBFile(username, password);
}

module.exports = {
  searchUsername,
  validatePassword,
  generateToken,
  generateHashedPassword,
  saveToDB,
};
