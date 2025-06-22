const express = require("express");
const cors = require("cors");
const app = express();
const hamburgueseriasRoutes = require("./routes/hamburgueserias.routes");

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/hamburgueserias", hamburgueseriasRoutes);

// Rutas
app.get("/", (req, res) => {
  res.send("API de BurgerGo funcionando");
});

module.exports = app;
