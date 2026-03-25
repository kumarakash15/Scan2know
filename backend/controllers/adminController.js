const axios = require("axios");
const QRCode = require("qrcode");
const jwt = require("jsonwebtoken");
const formatDriveLink = require("../utils/formatDriveLink");

// 🔐 LOGIN
exports.loginAdmin = (req, res) => {
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
};

// 📊 DASHBOARD
exports.getDashboard = async (req, res, next) => {
  try {
    const response = await axios.get(process.env.MAINHOSTEL_3RD);
    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

// ✅ 🧠 DYNAMIC YEAR API (NO RANGE)
exports.getRoomsByYear = async (req, res, next) => {
  try {
    const { year } = req.params;

    const urls = {
      "4th": process.env.MAINHOSTEL_4TH,
      "3rd": process.env.MAINHOSTEL_3RD,
      "2nd": process.env.MAINHOSTEL_2ND,
      "1st": process.env.MAINHOSTEL_1ST,
      "pharmacy": process.env.MAINHOSTEL_PHARMACY
    };

    const selectedUrl = urls[year];


    if (!selectedUrl) {
      return res.status(400).json({ message: "Invalid year" });
    }

    const response = await axios.get(selectedUrl);

    const formatted = response.data.map(item => ({
      "Room No": item["Room No"],
      students: [1, 2, 3, 4]
        .map(num => {
          const name = item[`Student ${num} Name`];
          if (!name || name.trim() === "") return null;

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
    console.error("YEAR API ERROR:", err.message); // 🔥 SEE ERROR
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

// 📱 QR
exports.generateQR = async (req, res, next) => {
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
};