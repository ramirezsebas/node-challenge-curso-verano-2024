const sortByTest = require("../../utils/sortByTest");
const {
  getCriptosExterno,
  getCriptoByIDExterno,
} = require("../data/cripto.data");

async function getAllCriptos(limit, page, sortBy) {
  const criptos = await getCriptosExterno();

  const limitedCriptos = paginate(criptos, limit, page);

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

  const sortedMappedCriptos = sortCriptos(mappedCriptos, sortBy);

  return sortedMappedCriptos;
}

function sortCriptos(originalCriptos, sortBy) {
  const sortedCriptos = [...originalCriptos];

  const sortByOrden = sortByTest(sortBy);

  if (sortByOrden === null) {
    return sortedCriptos;
  }

  const alphabetSort = ["simbolo", "nombre", "id"];
  const numberSort = ["orden", "volumen", "precio", "cambio"];

  const sortBySlice = sortBy.slice(1);
  if (alphabetSort.includes(sortBySlice)) {
    if (sortByOrden === "desc") {
      sortedCriptos.sort((a, b) => b[sortBySlice].localeCompare(a[sortBySlice]));
    } else {
      sortedCriptos.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    }
  }
  if (numberSort.includes(sortBySlice)) {
    if (sortByOrden === "desc") {
      sortedCriptos.sort((a, b) => b[sortBySlice] - a[sortBySlice]);
    } else {
      sortedCriptos.sort((a, b) => a[sortBy] - b[sortBy]);
    }
  }

  return sortedCriptos;
}

function paginate(array, limit, page) {
  return array.slice((page - 1) * limit, page * limit);
}

async function getCriptoByIdFromExterno(criptoId) {


  const cripto = await getCriptoByIDExterno(criptoId);

  if (!cripto) {
    return null;
  }

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
}

module.exports = {
  getAllCriptos,
  getCriptoByIdFromExterno,
};
