const app = require("./server.js");

const PORT = process.env.PORT || 8080;

app.listen(PORT, (req, res) => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});

// Manejo de errores no capturados
process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error);
  process.exit(1);
});

// Manejo de promesas no capturadas
process.on("unhandledRejection", (error) => {
  console.error("unhandledRejection", error);
  process.exit(1);
});
