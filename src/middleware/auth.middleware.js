const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = (req.headers.authorization || "").trim();
  let token = "";

  // Accept either "Bearer <token>" or plain "<token>" to be resilient across clients.
  if (/^bearer\s+/i.test(authHeader)) {
    token = authHeader.replace(/^bearer\s+/i, "").trim();
  } else {
    token = authHeader;
  }

  // Handle accidental double prefix from Swagger input: "Bearer Bearer <token>".
  if (/^bearer\s+/i.test(token)) {
    token = token.replace(/^bearer\s+/i, "").trim();
  }

  if (!token) {
    return res.status(401).json({ message: "Missing or invalid authorization token" });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({ message: "JWT_SECRET is not configured" });
  }

  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = {
  authenticateToken,
};