const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  getDashboard,
  getRoomsByYear,
  generateQR,
  getImage
} = require("../controllers/adminController");

const authenticateToken = require("../middleware/authMiddleware");

router.post("/admin-login", loginAdmin);

router.get("/admin/dashboard", authenticateToken, getDashboard);
router.get("/image/:id", getImage);
// ✅ dynamic route
router.get("/admin/dashboard/:year", authenticateToken, getRoomsByYear);

router.get("/admin/qr/:roomNo", authenticateToken, generateQR);

module.exports = router;