const {
  getUserCriptosByUsernameFromFile,
  saveUserCriptoFromDBFile,
  findUserCriptoFromDBFile,
} = require("../data/users.data");

async function getUsersCriptos(username) {
  return getUserCriptosByUsernameFromFile(username);
}

async function saveUserCripto(username, cripto) {
  return saveUserCriptoFromDBFile(username, cripto);
}

async function findUserCripto(username, criptoId) {
  return findUserCriptoFromDBFile(username, criptoId);
}

module.exports = {
  getUsersCriptos,
  saveUserCripto,
  findUserCripto,
};
