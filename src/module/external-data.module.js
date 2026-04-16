const express = require("express");
const { getExternalData } = require("../controllers/external-data.controller");

const router = express.Router();

router.get("/external-data", getExternalData);

module.exports = router;