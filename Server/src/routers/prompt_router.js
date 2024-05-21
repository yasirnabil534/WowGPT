const express = require("express");
const promptController = require("../controllers/prompt_controller");

const router = express.Router();

router.post("/prompt", promptController.callGPT);
router.get("/get-all", promptController.getHistory);

module.exports = router;