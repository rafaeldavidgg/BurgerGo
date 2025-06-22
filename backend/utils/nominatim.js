const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function obtenerDireccionDesdeCoordenadas(lat, lon) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`,
      {
        headers: {
          "User-Agent": "BurgerGo/1.0 (contacto@burgergo.es)",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Status ${res.status}`);
    }

    const data = await res.json();
    return data.display_name || "Dirección no disponible";
  } catch (err) {
    console.error("Error al consultar Nominatim:", err.message);
    return "Dirección no disponible";
  }
}

module.exports = obtenerDireccionDesdeCoordenadas;
