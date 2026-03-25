const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"]

    // 🔐 Extract token
    const token = authHeader && authHeader.split(" ")[1]

    // ❌ No token
    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided"
      })
    }

    // ✅ Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid or expired token"
        })
      }

      req.user = user
      next()
    })

  } catch (error) {
    return res.status(500).json({
      message: "Authentication failed",
      error: error.message
    })
  }
}

module.exports = authenticateToken