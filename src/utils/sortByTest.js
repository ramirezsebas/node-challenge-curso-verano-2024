/**
 * 
 * @param {string} property - Propiedad a ordenar
 * @returns {string} - "asc" si es ascendente, "desc" si es descendente, null si no es una propiedad válido.
 */
function sortByNumeric(property) {
  const regexTest = new RegExp(`[+-]?${property}`);

  if (!regexTest.test(property)) {
    return null;
  }

  if (property.charAt(0) === "-") {
    return "desc";
  } else {
    return "asc";
  }
}

module.exports = sortByNumeric;
