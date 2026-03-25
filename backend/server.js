require("dotenv").config();
const express = require("express");
const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes");
const roomRoutes = require("./routes/roomRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/", adminRoutes);
app.use("/", roomRoutes);

// ❌ 404
app.use((req, res) => {
  res.status(404).json({
    error: "404 Not Found",
    message: "Route does not exist"
  });
});

// 💥 Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    error: "500 Internal Server Error",
    message: err.message || "Something went wrong"
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});