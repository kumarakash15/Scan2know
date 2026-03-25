const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  getDashboard,
  getThirdYearRooms,
  generateQR
} = require("../controllers/adminController");

const authenticateToken = require("../middleware/authMiddleware");

router.post("/admin-login", loginAdmin);

router.get("/admin/dashboard", authenticateToken, getDashboard);
router.get("/admin/dashboard/third", authenticateToken, getThirdYearRooms);

router.get("/admin/qr/:roomNo", authenticateToken, generateQR);

module.exports = router;