const fs = require("fs/promises");
const logger = require("../../utils/logger");

async function getUserCriptosByUsernameFromFile(username) {
  try {
    await fs.access("usuarios.json");
  } catch (error) {
    await fs.writeFile("usuarios.json", "[]");
  }
  const usuariosJson = await fs.readFile("usuarios.json", "utf-8");

  try {
    await fs.access("criptos.json");
  } catch (error) {
    await fs.writeFile("criptos.json", "[]");
  }

  const criptosJson = await fs.readFile("criptos.json", "utf-8");

  const usuarios = JSON.parse(usuariosJson);

  const usuario = usuarios.find((usuario) => usuario.username === username);

  if (!usuario) {
    logger(`No se encontro el usuario ${username}`);
    return [];
  }

  const criptos = JSON.parse(criptosJson);

  const userCriptos = criptos.find((cripto) => cripto.username === username);

  return userCriptos?.criptos ?? [];
}

async function saveUserCriptoFromDBFile(username, userCripto) {
  try {
    await fs.access("usuarios.json");
  } catch (error) {
    await fs.writeFile("usuarios.json", "[]");
  }
  const usuariosJson = await fs.readFile("usuarios.json", "utf-8");

  try {
    await fs.access("criptos.json");
  } catch (error) {
    await fs.writeFile("criptos.json", "[]");
  }

  const criptosJson = await fs.readFile("criptos.json", "utf-8");

  const usuarios = JSON.parse(usuariosJson);

  const usuario = usuarios.find((usuario) => usuario.username === username);

  if (!usuario) {
    logger(`No se encontro el usuario ${username}`);
    return null;
  }

  const criptos = JSON.parse(criptosJson);

  const userCriptos = criptos.find((cripto) => username === cripto.username);

  if (!userCriptos) {
    const newCriptoUser = {
      username,
      criptos: [userCripto],
    };
    await fs.writeFile(
      "criptos.json",
      JSON.stringify([...criptos, newCriptoUser])
    );
    return newCriptoUser;
  }

  await fs.writeFile(
    "criptos.json",
    JSON.stringify(
      criptos.map((cripto) => {
        if (cripto.username === username) {
          return {
            ...cripto,
            criptos: [...cripto.criptos, userCripto],
          };
        }
        return cripto;
      })
    )
  );
}

async function findUserCriptoFromDBFile(username, criptoId) {
  try {
    await fs.access("usuarios.json");
  } catch (error) {
    await fs.writeFile("usuarios.json", "[]");
  }
  const usuariosJson = await fs.readFile("usuarios.json", "utf-8");

  try {
    await fs.access("criptos.json");
  } catch (error) {
    await fs.writeFile("criptos.json", "[]");
  }

  const criptosJson = await fs.readFile("criptos.json", "utf-8");

  const usuarios = JSON.parse(usuariosJson);

  const usuario = usuarios.find((usuario) => usuario.username === username);

  if (!usuario) {
    logger(`No se encontro el usuario ${username}`);
    return null;
  }

  const criptos = JSON.parse(criptosJson);

  const userCriptos = criptos.find((cripto) => username === cripto.username);

  if (!userCriptos) {
    return null;
  }

  return userCriptos.criptos.find((cripto) => cripto.id === criptoId);
}

module.exports = {
  getUserCriptosByUsernameFromFile,
  saveUserCriptoFromDBFile,
  findUserCriptoFromDBFile,
};
