const fs = require("fs/promises");


/**
 * Crea un archivo si no existe.
 * @param {string} filename - El nombre del archivo a crear.
 * @returns {Promise} - Una promesa que resuelve cuando se creó el archivo.
 */
async function createFileIfNotExists(filename) {
  try {
    await fs.access(filename);
  } catch (error) {
    await fs.writeFile(filename, "[]");
  }
}

module.exports = {
    createFileIfNotExists,
};
