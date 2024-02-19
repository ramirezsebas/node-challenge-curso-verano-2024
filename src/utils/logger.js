/**
 * Loguea mensajes en consola
 * @param {string} custom - Mensaje personalizado a loguear
 * @param {string} err - Mensaje de error a loguear
 * 
 */
function logger(custom, err = "") {
  const NODE_ENV = process.env.NODE_ENV || "dev";
  if (NODE_ENV.toLowerCase() === "dev") {
    console.log(custom);
    console.log(err);
  }
}

module.exports = logger;
