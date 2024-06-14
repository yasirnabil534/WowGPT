const express = require("express");
const assistantController = require("../controllers/assistant_controller");

const router = express.Router();

router.post("/create", assistantController.create)
router.get("/prompt", assistantController.callGPT);
router.get("/get-all", assistantController.getHistory);

module.exports = router;