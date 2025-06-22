const cron = require("node-cron");
const importarHamburgueseriasDesdeOSM = require("../services/importarOSM");

// Cron diario a las 4:00 AM
cron.schedule("0 4 * * *", async () => {
  console.log("⏰ Ejecutando importación automática desde OSM");
  await importarHamburgueseriasDesdeOSM();
});

// Exporta para uso manual
module.exports = importarHamburgueseriasDesdeOSM;
