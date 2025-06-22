const mongoose = require("mongoose");

const HamburgueseriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  coordenadas: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  descripcion: { type: String },
});

module.exports = mongoose.model("Hamburgueseria", HamburgueseriaSchema);
