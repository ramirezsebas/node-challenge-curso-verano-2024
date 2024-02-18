const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const authRouter = require("./auth/routers/auth.router.js");

const app = express();

// Libreria que nos permite impresion de logs
app.use(morgan("dev"));

// Libreria que nos permite proteger nuestra aplicacion
// escondiendo informacion de HTTP headers
// https://www.veracode.com/blog/secure-development/fasten-your-helmetjs-part-1-securing-your-express-http-headers#:~:text=By%20Bipin%20Mistry-,Helmet.,from%20the%20end%2Duser%20perspective.
app.use(helmet());

// Permite a express convertir body en un objeto de JS
app.use(express.json());

// Rutas de autenticacion
app.use("/auth", authRouter);

// Esto es normal en aplicaciones para poder probar si
// el servidor esta corriendo
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

// En caso que ninguna ruta sea encontrada
// se envia un error 404
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "No se encontro la ruta solicitada",
  });
});

module.exports = app;
