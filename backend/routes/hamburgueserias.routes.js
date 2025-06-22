const express = require('express');
const router = express.Router();
const controller = require('../controllers/hamburgueserias.controller');
const importar = require('../utils/cron');

router.get('/', controller.getHamburgueserias);
router.post('/importar', async (req, res) => {
  await importar();
  res.json({ status: 'Importación lanzada correctamente' });
});

module.exports = router;
