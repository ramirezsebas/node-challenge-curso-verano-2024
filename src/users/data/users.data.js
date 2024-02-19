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

  const userCripto = criptos.find((cripto) => username === cripto.username);

  const newUserCripto = {
    username,
  };

  if (!userCripto) {
    newUserCripto.criptos = [newCripto];
    await fs.writeFile(
      "criptos.json",
      JSON.stringify([...criptos, newUserCripto])
    );
    return newUserCripto;
  }

  newUserCripto.criptos = [...userCripto.criptos, newCripto];

  console.log(newUserCripto);

  await fs.writeFile(
    "criptos.json",
    JSON.stringify(
      criptos.map((cripto) => {
        if (cripto.username === username) {
          return {
            ...cripto,
            criptos: [...cripto.criptos, newCripto],
          };
        }
        return cripto;
      })
    )
  );

  return newUserCripto;
}

async function findUserCriptoFromDBFile(username, criptoId) {
  const usuario = await getUserByUsernameFromFile(username);

  if (!usuario) {
    logger(`No se encontro el usuario ${username}`);
    return null;
  }

  await createFileIfNotExists("criptos.json");

  const criptosJson = await fs.readFile("criptos.json", "utf-8");

  const criptos = JSON.parse(criptosJson);

  const userCriptos = criptos.find((cripto) => username === cripto.username);

  if (!userCriptos) {
    return null;
  }

  return userCriptos.criptos.find((cripto) => cripto.id === criptoId);
}

async function deletUserCriptoFromDBFile(username, criptoId) {
  const usuario = await getUserByUsernameFromFile(username);

  if (!usuario) {
    logger(`No se encontro el usuario ${username}`);
    return null;
  }

  await createFileIfNotExists("criptos.json");

  const criptosJson = await fs.readFile("criptos.json", "utf-8");

  const criptos = JSON.parse(criptosJson);

  const userCriptos = criptos.find((cripto) => username === cripto.username);

  if (!userCriptos) {
    return null;
  }
  
  const newUserCriptos = userCriptos.criptos.filter((cripto) => cripto.id !== criptoId);

  await fs.writeFile(
    "criptos.json",
    JSON.stringify(
      criptos.map((cripto) => {
        if (cripto.username === username) {
          return {
            ...cripto,
            criptos: newUserCriptos,
          };
        }
        return cripto;
      })
    )
  );

  return {
    username,
    cripto:criptoId,
  };
}

module.exports = {
  getUserCriptosByUsernameFromFile,
  saveUserCriptoFromDBFile,
  findUserCriptoFromDBFile,
  deletUserCriptoFromDBFile,
};
