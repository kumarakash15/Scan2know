const axios = require("axios");
const QRCode = require("qrcode");
const jwt = require("jsonwebtoken");
const sharp = require('sharp');
const path = require('path');
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
    const urls = [
      process.env.MAINHOSTEL_1ST,
      process.env.MAINHOSTEL_2ND,
      process.env.MAINHOSTEL_3RD,
      process.env.MAINHOSTEL_4TH,
      process.env.MAINHOSTEL_PHARMACY
    ];
    const responses = await Promise.all(urls.map(url => axios.get(url)));
    const allData = responses.flatMap(res => res.data);
    res.json(allData);
  } catch (err) {
    next(err);
  }
};

exports.getImage = async (req, res) => {
  try {
    const { id } = req.params;

    const url = `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;

    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });
    const contentType = response.headers["content-type"];

    res.set("Content-Type", contentType);
    res.set("Cache-Control", "public, max-age=86400");

    res.send(response.data);

  } catch (err) {
    console.error("Image fetch error:", err.message);
    res.status(500).send("Image load failed");
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

            parentMobile:
              item[`Student ${num} Parents Mobile number`] ||
              item[`Student ${num} Parents Mobile No`] ||
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

    // 📱 Generate QR with HIGH error correction
    const qrSize = 400;

    const qrBuffer = await QRCode.toBuffer(url, {
      width: qrSize,
      margin: 2,
      errorCorrectionLevel: 'H', // 🔥 IMPORTANT
    });

    // 🏷️ Load & resize logo
    const logoPath = path.join(__dirname, '../assets/eatmlogo.png');

    const logoSize = 80;

    const logo = await sharp(logoPath)
      .resize(logoSize, logoSize)
      .toBuffer();

    // 🧠 Canvas size
    const canvasWidth = 600;
    const canvasHeight = 700;

    // 📍 Center positions
    const qrLeft = (canvasWidth - qrSize) / 2;
    const qrTop = 120;

    const logoLeft = qrLeft + (qrSize - logoSize) / 2;
    const logoTop = qrTop + (qrSize - logoSize) / 2;

    const finalImage = await sharp({
      create: {
        width: canvasWidth,
        height: canvasHeight,
        channels: 4,
        background: '#ffffff',
      },
    })
      .composite([

        // 🔼 Top Title
        {
          input: Buffer.from(`
            <svg width="600" height="40">
              <style>
                .title { font-size: 32px; font-weight: bold; fill: black; }
              </style>
              <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="title">
                Room ${roomNo}
              </text>
            </svg>
          `),
          top: 20,
          left: 0,
        },

        // 📱 QR
        {
          input: qrBuffer,
          top: qrTop,
          left: qrLeft,
        },

        // 🏷️ Logo (perfect center)
        {
          input: logo,
          top: logoTop,
          left: logoLeft,
        },

        // 🔽 Bottom Text
        {
          input: Buffer.from(`
            <svg width="600" height="40">
              <style>
                .subtitle { font-size: 20px; fill: black; }
              </style>
              <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="subtitle">
                Scan to know the details of room members
              </text>
            </svg>
          `),
          top: 580,
          left: 0,
        },

      ])
      .png()
      .toBuffer();

    res.set({
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename=room-${roomNo}.png`,
    });

    res.send(finalImage);

  } catch (err) {
    console.error(err);
    next(err);
  }
};