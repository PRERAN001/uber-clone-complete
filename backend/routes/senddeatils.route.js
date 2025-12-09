const express = require("express");
const router = express.Router();
const {senddetails} = require("../controller/senddetails.controller");
router.post("/senddetails", senddetails);
module.exports = router;