const { default: axios } = require("axios");
const getCriptosExterno = require("../data/cripto.data");

async function getAllCriptos() {
  const criptos = await getCriptosExterno();

  const mappedCriptos = criptos.data.map((cripto) => {
    const {
      id,
      rank,
      symbol,
      name,
      volumeUsd24Hr,
      priceUsd,
      changePercent24Hr,
    } = cripto;

    return {
      orden: rank,
      id: id,
      simbolo: symbol,
      nombre: name,
      volumen: volumeUsd24Hr,
      precio: priceUsd,
      cambio: changePercent24Hr,
    };
  });

  return mappedCriptos;
}

module.exports = getAllCriptos;
