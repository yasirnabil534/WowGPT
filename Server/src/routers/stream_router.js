const express = require("express");
const streamController = require("../controllers/stream_controller");

const router = express.Router();

router.get("/prompt", streamController.callGPT);
router.get("/get-all", streamController.getHistory);

module.exports = router;