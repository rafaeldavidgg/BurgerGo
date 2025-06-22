const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const Hamburgueseria = require("../models/Hamburgueseria");
const obtenerDireccionDesdeCoordenadas = require("../utils/nominatim");

async function importarHamburgueseriasDesdeOSM() {
  const query = `
    [out:json][timeout:50];
    area["ISO3166-1"="ES"][admin_level=2]->.searchArea;
    (
      node["cuisine"~"burger",i](area.searchArea);
      node["name"~"burger",i](area.searchArea);
    );
    out body;
    >;
    out skel qt;
  `;

  const franquicias = [
    "mcdonald",
    "burger king",
    "tgb",
    "telepizza",
    "foster",
    "kfc",
  ];

  try {
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });

    const data = await res.json();
    const nodos = data.elements.filter((el) => el.type === "node");

    let insertados = 0;

    for (const nodo of nodos) {
      const nombre = nodo.tags?.name || "";
      const brand = nodo.tags?.brand || "";
      let direccion = await obtenerDireccionDesdeCoordenadas(
        nodo.lat,
        nodo.lon
      );

      if (!nombre || !nodo.lat || !nodo.lon) continue;

      // 🔍 Verificar si el nodo es de una franquicia
      const esFranquicia = franquicias.some(
        (f) =>
          nombre.toLowerCase().includes(f) || brand.toLowerCase().includes(f)
      );
      if (esFranquicia) continue;

      const yaExiste = await Hamburgueseria.findOne({
        nombre: nombre,
        "coordenadas.lat": nodo.lat,
        "coordenadas.lng": nodo.lon,
      });

      if (!yaExiste) {
        await Hamburgueseria.create({
          nombre,
          direccion,
          coordenadas: {
            lat: nodo.lat,
            lng: nodo.lon,
          },
          descripcion: (() => {
            const raw = nodo.tags?.cuisine ?? "";
            if (!raw) return "Hamburguesería añadida desde OSM";

            const tipos = raw.toLowerCase().split(";");
            if (tipos.length === 1 && tipos[0].includes("burger"))
              return "Hamburguesas";
            if (tipos[0].includes("burger")) return "Hamburguesas y más";
            return "Otro tipo de local";
          })(),
        });
        insertados++;
      }
    }

    console.log(`✅ Hamburgueserías nuevas insertadas: ${insertados}`);
  } catch (err) {
    console.error("❌ Error durante la importación desde OSM:", err);
  }
}

module.exports = importarHamburgueseriasDesdeOSM;
