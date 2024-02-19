const { default: axios } = require("axios");

async function getCriptosExterno() {
  const criptosResponse = await axios.get("https://api.coincap.io/v2/assets");

  const criptos = criptosResponse.data;

  return criptos.data;
}

async function getCriptoByIDExterno(id) {
  const criptosResponse = await axios.get("https://api.coincap.io/v2/assets");

  const criptos = criptosResponse.data;

  return criptos.data.find((cripto) => cripto.id === id);
}

module.exports = {
  getCriptoByIDExterno,
  getCriptosExterno,
};
