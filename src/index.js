const app = require('./server.js')

const PORT = process.env.PORT  || 8080;

app.listen(PORT,(req,res)=>{
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`)
});