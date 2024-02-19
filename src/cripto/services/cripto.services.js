const sortByTest = require("../../utils/sortByTest");
const { getCriptosExterno, getCriptoByIDExterno } = require("../data/cripto.data");

async function getAllCriptos(limit, page, sortBy, filter) {
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

  const sortedMappedCriptos = [...mappedCriptos];

  const sortByOrden = sortByTest(sortBy);

  if (sortByOrden != null) {
    if (sortByOrden === "desc") {
      sortedMappedCriptos.sort(
        (a, b) => b[sortBy.slice(1)] - a[sortBy.slice(1)]
      );
    } else {
      sortedMappedCriptos.sort((a, b) => a[sortBy] - b[sortBy]);
    }
  }

  return sortedMappedCriptos;
}

async function getCriptoById(criptoId){
  return getCriptoByIDExterno(criptoId);
}

module.exports = {
  getAllCriptos,
  getCriptoById
}
