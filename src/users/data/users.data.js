const fs = require("fs/promises");
const logger = require("../../utils/logger");
const { createFileIfNotExists } = require("../../utils/fileUtils");
const { getUserByUsernameFromFile } = require("../../auth/data/auth.data");

async function getUserCriptosByUsernameFromFile(username) {
  const usuario = await getUserByUsernameFromFile(username);

  if (!usuario) {
    logger(`No se encontro el usuario ${username}`);
    return null;
  }

  await createFileIfNotExists("criptos.json");

  const criptosJson = await fs.readFile("criptos.json", "utf-8");

  const criptos = JSON.parse(criptosJson);

  const userCripto = criptos.find((cripto) => cripto.username === username);

  return userCripto;
}

async function saveUserCriptoFromDBFile(username, newCripto) {
  const usuario = await getUserByUsernameFromFile(username);

  if (!usuario) {
    logger(`No se encontro el usuario ${username}`);
    return null;
  }

  await createFileIfNotExists("criptos.json");

  const criptosJson = await fs.readFile("criptos.json", "utf-8");

  const criptos = JSON.parse(criptosJson);

  const userCripto = criptos.find((cripto) => username === cripto.username)
  
  const newUserCripto = {
    username,
  };

  if (!userCripto) {
    console.log("No se encontro el usuario");
    console.log(userCripto);
    newUserCripto.criptos = [newCripto];
    await fs.writeFile(
      "criptos.json",
      JSON.stringify([...criptos, newUserCripto])
    );
    return newUserCripto;
  }



  newUserCripto.criptos = [...userCripto.criptos, newCripto];

  await fs.writeFile(
    "criptos.json",
    JSON.stringify(
      criptos.map((cripto) => {
        if (cripto.username === username) {
          return {
            ...cripto,
            criptos: [...cripto.criptos, newUserCripto],
          };
        }
        return cripto;
      })
    )
  );

  return newUserCripto;
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
