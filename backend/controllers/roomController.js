const axios = require("axios");
const formatDriveLink = require("../utils/formatDriveLink");

exports.getRoomDetails = async (req, res) => {
  try {
    const roomNo = req.params.roomNo;

    const response = await axios.get(
      `${process.env.MAINHOSTEL_3RD}?room=${roomNo}`
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
    console.error("ROOM API ERROR:", err.message);
    res.status(500).json({ message: "Failed to fetch room data" });
  }
};