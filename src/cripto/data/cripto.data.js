const { default: axios } = require("axios");

async function getCriptosExterno() {
  const criptosResponse = await axios.get("https://api.coincap.io/v2/assets");

  const criptos = criptosResponse.data;

  return criptos.data;
}

module.exports = getCriptosExterno;
