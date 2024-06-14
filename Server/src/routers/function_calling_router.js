const express = require("express");
const functionCallingController = require("../controllers/function_calling_controller");

const router = express.Router();

router.post("/prompt", functionCallingController.callGPT);
router.get("/get-all", functionCallingController.getHistory);

module.exports = router;