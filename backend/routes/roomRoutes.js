const express = require("express");
const router = express.Router();

const { getRoomDetails } = require("../controllers/roomController");

router.get("/room/:roomNo", getRoomDetails);

module.exports = router;