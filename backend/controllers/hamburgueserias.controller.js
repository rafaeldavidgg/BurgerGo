const Hamburgueseria = require("../models/Hamburgueseria");

// GET /hamburgueserias
async function getHamburgueserias(req, res) {
  try {
    const hamburgueserias = await Hamburgueseria.find();
    res.json(hamburgueserias);
  } catch (err) {
    console.error("Error al obtener hamburgueserías:", err);
    res.status(500).json({ error: "Error al obtener hamburgueserías" });
  }
}

module.exports = {
  getHamburgueserias,
};
