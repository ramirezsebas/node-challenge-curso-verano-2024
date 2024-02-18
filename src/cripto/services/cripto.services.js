const getCriptosExterno = require("../data/cripto.data");

async function getAllCriptos(limit, page) {
  const criptos = await getCriptosExterno();

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const limitedCriptos = criptos.slice(startIndex, endIndex);

  const mappedCriptos = limitedCriptos.map((cripto) => {
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
