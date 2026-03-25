require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const QRCode = require("qrcode");
const jwt = require("jsonwebtoken");

const authenticateToken = require("./Middleware.js");

const app = express();

app.use(cors());
app.use(express.json());

// 🔧 Helper
function formatDriveLink(link) {
  if (!link) return "";
  try {
    const match =
      link.match(/id=([^&]+)/) ||
      link.match(/\/d\/([^/]+)/);
    if (!match) return "";
    const fileId = match[1];
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  } catch (err) {
    return "";
  }
}
// 🌐 PUBLIC API (QR Scan)
app.get("/room/:roomNo", async (req, res) => {
  try {
    const roomNo = req.params.roomNo;

    const response = await axios.get(
      `${process.env.MAINHOSTEL_3RD}?room=${roomNo}` // ✅ FIXED
    );

    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ message: "Room not found" });
    }

    const formatted = response.data.map(item => ({
      room: item["Room No"],
      students: [1, 2, 3, 4]
        .map(num => {
          const name = item[`Student ${num} Name`];
          if (!name) return null;

          return {
            name,
            regd: item[`Student ${num} Regd`] || "N/A",
            branch: item[`Student ${num} Branch`] || "N/A",
            mobile:
              item[`Student ${num} Mobile number`] ||
              item[`Student ${num} Mobile No`] ||
              "N/A",
            photo: formatDriveLink(
              item[`Student ${num} photo`] ||
              item[`Student ${num} Photo`]
            )
          };
        })
        .filter(Boolean)
    }));

    res.json(formatted);

  } catch (err) {
    console.error("ROOM API ERROR:", err.message);
    res.status(500).json({ message: "Failed to fetch room data" });
  }
});

// 🔐 Admin Login
app.post("/admin-login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({ success: true, token });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
});

// 📊 Dashboard
app.get("/admin/dashboard", authenticateToken, async (req, res, next) => {
  try {
    const response = await axios.get(process.env.MAINHOSTEL_3RD);
    res.json(response.data);
  } catch (err) {
    next(err);
  }
});

// 🏢 3rd Year Rooms
app.get("/admin/dashboard/third", authenticateToken, async (req, res, next) => {
  try {
    const response = await axios.get(process.env.MAINHOSTEL_3RD);

    const filtered = response.data
      .filter(item => {
        const room = Number(item["Room No"]);
        return room >= 300 && room <= 330;
      })
      .map(item => ({
        "Room No": item["Room No"],

        students: [1, 2, 3, 4]
          .map(num => {
            const name = item[`Student ${num} Name`];

            if (!name || name.trim() === "") return null;

            const photoRaw =
              item[`Student ${num} photo`] ||
              item[`Student ${num} Photo`] ||
              "";

            const formattedPhoto = formatDriveLink(photoRaw);
            return {
              name,
              regd: item[`Student ${num} Regd`] || "N/A",
              branch: item[`Student ${num} Branch`] || "N/A",
              mobile:
                item[`Student ${num} Mobile number`] ||
                item[`Student ${num} Mobile No`] ||
                "N/A",
              photo: formattedPhoto
            };
          })
          .filter(Boolean) // ✅ removes nulls
      }));

    res.json(filtered);

  } catch (err) {
    next(err);
  }
});

// 📱 QR Download
app.get("/admin/qr/:roomNo", authenticateToken, async (req, res, next) => {
  try {
    const roomNo = req.params.roomNo;

    const url = `${process.env.FRONTEND_URL}/show/${roomNo}`;
    const qr = await QRCode.toBuffer(url);

    res.set({
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename=room-${roomNo}.png`,
    });

    res.send(qr);
  } catch (err) {
    next(err);
  }
});

// ❌ 404 HANDLER (VERY IMPORTANT)
app.use((req, res) => {
  res.status(404).json({
    error: "404 Not Found",
    message: "Route does not exist"
  });
});


// 💥 GLOBAL ERROR HANDLER (500)
app.use((err, req, res, next) => {
  res.status(500).json({
    error: "500 Internal Server Error",
    message: err.message || "Something went wrong"
  });
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});