const express = require("express");
const router = express.Router();
const controller = require("../controllers/hamburgueserias.controller");

router.get("/", controller.getHamburgueserias);

module.exports = router;
