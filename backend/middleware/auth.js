const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    req.userId = decodedToken.id;
    next();
  });
};

module.exports = requireAuth;
