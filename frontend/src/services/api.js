const API_URL = import.meta.env.VITE_API_URL;

export async function getHamburgueserias() {
  try {
    const res = await fetch(`${API_URL}/hamburgueserias`);
    if (!res.ok) throw new Error("Error al obtener hamburgueserías");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
