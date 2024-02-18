function sortByTest(property) {
  if (property === "id" || property === "nombre" || property === "simbolo") {
    return null;
  }

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

module.exports = sortByTest;
