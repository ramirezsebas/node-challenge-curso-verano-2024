const {
  getUserByUsernameFromFile,
} = require("../data/getUserByUsernameFromFile");
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
  const doesPasswordMatch = await bcrypt.compare(
    rawPassword,
    encryptedPassword
  );

  return doesPasswordMatch;
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

module.exports = {
  searchUsername,
  validatePassword,
  generateToken,
};
