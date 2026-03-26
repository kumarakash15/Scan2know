const axios = require("axios");
const formatDriveLink = require("../utils/formatDriveLink");

exports.getRoomDetails = async (req, res) => {
  try {
    const roomNo = req.params.roomNo;

    const urls = [
      process.env.MAINHOSTEL_4TH,
      process.env.MAINHOSTEL_3RD,
      process.env.MAINHOSTEL_2ND,
      process.env.MAINHOSTEL_1ST,
      process.env.MAINHOSTEL_PHARMACY
    ];

    let foundRoom = null;

    // 🔍 Search in all APIs
    for (const url of urls) {
      const response = await axios.get(url);

      if (response.data && response.data.length > 0) {

        const roomMatch = response.data.find(
          item => String(item["Room No"]) === String(roomNo)
        );

        if (roomMatch) {
          foundRoom = roomMatch;
          break;
        }
      }
    }

    // ❌ Not found
    if (!foundRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    // ✅ Dynamic students (supports 1–5 or more)
    const students = [];

    for (let i = 1; i <= 6; i++) {
      const name = foundRoom[`Student ${i} Name`];

      if (!name || name.trim() === "") continue;

      students.push({
        name,
        regd: foundRoom[`Student ${i} Regd`] || "N/A",
        branch: foundRoom[`Student ${i} Branch`] || "N/A",
        mobile:
          foundRoom[`Student ${i} Mobile number`] ||
          foundRoom[`Student ${i} Mobile No`] ||
          "N/A",

        parentMobile:
          foundRoom[`Student ${i} Parents Mobile number`] ||
          foundRoom[`Student ${i} Parents Mobile No`] ||
          "N/A",

        photo: formatDriveLink(
          foundRoom[`Student ${i} photo`] ||
          foundRoom[`Student ${i} Photo`]
        )
      });
    }

    res.json({
      room: foundRoom["Room No"],
      students
    });

  } catch (err) {
    console.error("ROOM API ERROR:", err.message);
    res.status(500).json({ message: "Failed to fetch room data" });
  }
};