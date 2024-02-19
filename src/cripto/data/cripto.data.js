const { default: axios } = require("axios");


const BASE_URL_CRIPTOS = "https://api.coincap.io/v2/assets";

async function getCriptosExterno() {
  const criptosResponse = await axios.get(BASE_URL_CRIPTOS);

  const criptos = criptosResponse.data;

  return criptos.data;
}

async function getCriptoByIDExterno(id) {
  const criptosResponse = await axios.get(BASE_URL_CRIPTOS);

  const criptos = criptosResponse.data;

  return criptos.data.find((cripto) => cripto.id === id);
}

module.exports = {
  getCriptoByIDExterno,
  getCriptosExterno,
};
