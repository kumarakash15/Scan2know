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

// 🏢 3RD YEAR
exports.getThirdYearRooms = async (req, res, next) => {
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

    res.json(filtered);
  } catch (err) {
    next(err);
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