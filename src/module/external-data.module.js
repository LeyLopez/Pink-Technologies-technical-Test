const express = require("express");
const { getExternalData } = require("../controllers/external-data.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/external-data", authenticateToken, getExternalData);

module.exports = router;